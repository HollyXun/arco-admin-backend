import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { DataSource, Repository } from 'typeorm';
import { PostsRo } from './posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  async findAll(query): Promise<PostsRo> {
    const queryBuilder = await this.dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('post');

    queryBuilder.where('1 = 1');
    queryBuilder.orderBy('post.create_time', 'DESC');

    const count = await queryBuilder.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    queryBuilder.limit(pageSize);
    queryBuilder.offset(pageSize * (pageNum - 1));

    const posts = await queryBuilder.getMany();
    return {
      list: posts,
      count: count,
    };
    /**
    const [allPostsEntity, postsCount] =
      await this.postsRepository.findAndCount();

    return {
      list: allPostsEntity,
      count: postsCount,
    }
     ;**/
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOne(id);
  }

  // 更新文章
  async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}

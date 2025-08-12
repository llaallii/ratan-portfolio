import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

const Link = defineNestedType(() => ({
  name: 'Link',
  fields: {
    label: { type: 'string', required: true },
    url: { type: 'string', required: true },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    cover: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    timeline: { type: 'string', required: true },
    role: { type: 'string', required: true },
    stack: { type: 'list', of: { type: 'string' }, required: true },
    outcomes: { type: 'list', of: { type: 'string' }, required: true },
    links: { type: 'list', of: Link, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
  mdx: { remarkPlugins: [remarkGfm] },
});

const fs = require('fs');
const frontMatter = require('front-matter');
const marked = require('marked');
const kebabCase = require('lodash.kebabcase');

const POST_PATH = './posts';

const posts = fs.readdirSync(POST_PATH).map(postFilename => {
  const postContent = fs.readFileSync(`${POST_PATH}/${postFilename}`, {
    encoding: 'utf8'
  });

  const postFrontMatter = frontMatter(postContent);
  const postTitle = postFrontMatter.attributes.title;

  return {
    title: postTitle,
    slug: kebabCase(postTitle),
    html: marked(postFrontMatter.body)
  };
});

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;

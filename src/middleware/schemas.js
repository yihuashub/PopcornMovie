import {schema} from "normalizr";

const userSchema = new schema.Entity('users', {}, {
    idAttribute: user => user.login.toLowerCase()
})

const repoSchema = new schema.Entity('repos', {
    owner: userSchema
}, {
    idAttribute: repo => repo.fullName.toLowerCase()
})


const article = new schema.Entity('articles', {}, { idAttribute: 'slug' });
const articlesSchema = { articles:  [article], counter:article.articlesCount};

const project = new schema.Entity('projects', {}, { idAttribute: 'slug' });
const projectsSchema = { projects:  [project], counter:project.projectsCount};

const tags = new schema.Entity('tags');

// Schemas for Github API responses.
export const Schemas = {
    USER: userSchema,
    USER_ARRAY: [userSchema],
    REPO: repoSchema,
    REPO_ARRAY: [repoSchema],
    ARTICLES_ARRAY:articlesSchema,
    ARTICLE_ARRAY:[article],
    PROJECT_ARRAY:[project],
    PROJECTS_ARRAY:projectsSchema,
    TAG_ARRAY:tags

}

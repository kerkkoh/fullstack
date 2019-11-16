const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((acc, cur) => acc + cur, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => cur.likes > acc.likes ? cur : acc)
}

const mostBlogs = (blogs) => {
  let authors = new Map()
  blogs.forEach((b) => {
    const name = b.author
    const prev = authors.get(name)
    authors.set(name, prev !== undefined ? prev + 1 : 1)
  })
  let arr = []
  for (var [author, blogsAmt] of authors) {
    arr.push({ author, blogs: blogsAmt })
  }
  return arr.reduce((acc, cur) => cur.blogs > acc.blogs ? cur : acc)
}

const mostLikes = (blogs) => {
  let authors = new Map()
  blogs.forEach((b) => {
    const name = b.author
    const prev = authors.get(name)
    authors.set(name, (prev !== undefined ? prev : 0) + b.likes)
  })
  let arr = []
  for (var [author, amnt] of authors) {
    arr.push({ author, likes: amnt })
  }
  return arr.reduce((acc, cur) => cur.likes > acc.likes ? cur : acc)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
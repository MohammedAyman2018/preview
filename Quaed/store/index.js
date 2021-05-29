
export const state = () => ({
  user: null,
  editUser: null,

  words: [],
  word: null,

  bookmark: {
    words: [],
  },

  articles: [],
  article: null,

  currentArticle: {
    title: '',
    author: '',
    created_at: '',
    comments: [],
  },
  relpy: null
});

export const mutations = {
  EditUser(state, user) {
    state.user = user;
  },
  getEditUser(state, user) {
    state.editUser = user;
  },

  words(state, the_words) {
    if (state.user) {
      let in_bookmark = state.user.bookmark.words;
      state.bookmark.words = [];

      the_words.forEach(word => {
        if (in_bookmark.includes(word._id)) {
          word.marked = true;
          state.bookmark.words.push(word)
        
        }
        else word.marked = false
      })
    }
    state.words = the_words
  },
  addWord(state, word) {
    state.words.push(word)
  },
  getEditWord(state, word) {
    state.word = word;
  },
  toggleWord(state, position) {
    state.words[position].marked = !state.words[position].marked
  },

  articles(state, articles) {
    state.articles = articles;
  },
  addArticle(state, article) {
    state.articles.push(article)
  },
  getEditArticle(state, article) {
    state.article = article;
  },
  getCurrentArticle(state, article) {
    state.currentArticle = article;
  },

  getComment(state, comment) {
    state.relpy = comment;
  },
  logout(state) {
    state.user = null
  }
};

export const actions = {
  get_articles: ({ commit }, articles) => {
    commit("articles", articles);
  }
};

export const getters = {
  getUser: state => {
    return state.user
  }
};

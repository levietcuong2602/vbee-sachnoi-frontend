const state = () => ({
  id: null,
  content: "",
  name: "",
  author: "",
  publicYear: "",
  mimeType: "mp3",
  chapters: [],
  pages: [],
  file: null,
  voice: "hn_male_xuantin_vdts_48k-hsmm",
  rate: 1.0,
  bitRate: "64000",
  soundBackground: "",
  usedSoundBackground: false,
  soundBackgroundVolumn: 30,
  isEditing: true
});
const mutations = {
  UPDATE_CONTENT_BOOK: (state, content) => {
    state.content = content;
  },
  UPDATE_INFO_BOOK: (state, params) => {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        state[key] = element;
      }
    }
    // state.name = name;
    // state.author = author;
    // state.publicYear = publicYear;
    // state.mimeType = mimeType;
    // state.id = id;
    // state.rate = rate;
    // state.voice = voice;
    // state.bitRate = bitRate;
    // state.soundBackground = soundBackground;
    // state.usedSoundBackground = usedSoundBackground;
    // state.soundBackgroundVolumn = soundBackgroundVolumn;
    // state.file = file;
  },
  UPDATE_CHAPTER_BOOK: (state, chapters) => {
    state.chapters = chapters;
  },
  UPDATE_ID_BOOK: (state, id) => {
    state.id = id;
  },
  UPDATE_VOICE_BOOK: (state, voice) => {
    state.voice = voice;
  },
  UPDATE_MIME_TYPE_BOOK: (state, mimeType) => {
    state.mimeType = mimeType;
  },
  UPDATE_BIT_RATE_BOOK: (state, bitRate) => {
    state.bitRate = bitRate;
  },
  UPDATE_RATE_BOOK: (state, rate) => {
    state.rate = rate;
  },
  UPDATE_SOUND_BACKGROUND: (state, soundBackground) => {
    state.soundBackground = soundBackground;
  },
  UPDATE_USED_SOUND_BACKGROUND: (state, usedSoundBackground) => {
    state.usedSoundBackground = usedSoundBackground;
  },
  UPDATE_SOUND_VOLUMN: (state, soundBackgroundVolumn) => {
    state.soundBackgroundVolumn = soundBackgroundVolumn;
  },
  UPDATE_PAGES_BOOK: (state, pages) => {
    state.pages = pages;
  },
  UPDATE_IS_EDITING: (state, isEditing) => {
    state.isEditing = isEditing;
  }
};
const actions = {
  updateContentBook({ commit }, content) {
    commit("UPDATE_CONTENT_BOOK", content);
  },
  updateInfoBook({ commit }, bookInfo) {
    commit("UPDATE_INFO_BOOK", bookInfo);
  },
  updateChapterBook({ commit }, chapters) {
    commit("UPDATE_CHAPTER_BOOK", chapters);
  },
  updateIdBook({ commit }, id) {
    commit("UPDATE_ID_BOOK", id);
  },
  updateVoiceBook({ commit }, voice) {
    commit("UPDATE_VOICE_BOOK", voice);
  },
  updateMimeTypeBook({ commit }, mimeType) {
    commit("UPDATE_MIME_TYPE_BOOK", mimeType);
  },
  updateBitRate({ commit }, bitRate) {
    commit("UPDATE_BIT_RATE_BOOK", bitRate);
  },
  updateRate({ commit }, rate) {
    commit("UPDATE_RATE_BOOK", rate);
  },
  updateSoundBackground({ commit }, soundBackground) {
    commit("UPDATE_SOUND_BACKGROUND", soundBackground);
  },
  updateUsedSoundBackground({ commit }, usedSoundBackground) {
    commit("UPDATE_USED_SOUND_BACKGROUND", usedSoundBackground);
  },
  updateSoundVolumn({ commit }, soundBackgroundVolumn) {
    commit("UPDATE_SOUND_VOLUMN", soundBackgroundVolumn);
  },
  updatePages({ commit }, pages) {
    commit("UPDATE_PAGES_BOOK", pages);
  },
  updateIsEditing({ commit }, isEditing) {
    commit("UPDATE_IS_EDITING", isEditing);
  }
};
export default {
  state,
  mutations,
  actions
};

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import navigation from './components/router/storage/reducer';
import words from './components/router/storage/getWordsRedux/wordsReducer';
import speakIt from './components/speakIt/redux/speakItReducer';
import vocabulary from './components/vocabulary/redux/vocabularyReducer';
import savannah from './components/savannah/storage/reducer';
import settings from './components/router/storage/getSettingsRedux/settingsReducer';
import mainGame from './components/mainGame/redux/mainGameReducer';
import statistics from './components/router/storage/getPutStatisticsRedux/statisticsReducer';
import aggregatedWords from './components/router/storage/getAggregatedWordsRedux/aggregatedWordsReducer';
import puzzle from './components/english-puzzle/redux/puzzleReducer';

const reducer = combineReducers({
    navigation,
    vocabulary,
    settings,
    words,
    mainGame,
    statistics,
    aggregatedWords,
    speakIt,
    puzzle,
    savannah,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import aggregatedWordsSelectors from '../../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';

function StartPage({ settings, userHaveWords, fetchWords, setGroup, setUserWords }) {
    const buttons = [];
    for (let i = 0; i < 6; i += 1) {
        buttons.push(
            <Button
                onClick={() => setGroup(i)}
                key={`groupbtn_${i}`}
                variant={i === settings.group ? 'contained' : 'outlined'}
            >
                {i + 1}
            </Button>
        );
    }

    useEffect(() => {
        if (userHaveWords) {
            setUserWords();
        }
    }, [userHaveWords]);

    return (
        <div className="start_page">
            <div className="level">
                {userHaveWords ? (
                    <>
                        <div>
                            <p>You can repeat learned words</p>
                            <Button
                                onClick={() => setUserWords()}
                                color="primary"
                                aria-label="contained primary button group"
                                variant={settings.userWords ? 'contained' : 'outlined'}
                            >
                                My Words
                            </Button>
                        </div>
                        <p>or</p>
                    </>
                ) : null}

                <div>
                    <p>You can choose difficulty level</p>
                    <ButtonGroup
                        variant="outlined"
                        color="primary"
                        aria-label="contained primary button group"
                    >
                        {buttons.map((e) => e)};
                    </ButtonGroup>
                </div>
            </div>
            <div>
                <h2>SAVANNAH</h2>
                <p>
                    This excercise will help you to improve vocabulary. The more words you know, the
                    more experience points you get.
                </p>
            </div>
            <Button
                onClick={() => fetchWords(settings.userWords, settings.group)}
                color="primary"
                aria-label="contained primary button group"
                variant="contained"
                className="start_btn"
            >
                Start Game
            </Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (userWords, group) => {
        dispatch(actions.words.get({ userWords, group }));
    },
    setGroup: (payload) => {
        dispatch(actions.gameSettings.setGroup(payload));
    },
    setUserWords: () => {
        dispatch(actions.gameSettings.setUserWords());
    },
});

const mapStateToProps = (state) => ({
    settings: selectors.gameSettings(state),
    userHaveWords: aggregatedWordsSelectors.getWordsCount(state) >= 20,
});

StartPage.propTypes = {
    settings: PropTypes.exact({
        userWords: PropTypes.bool.isRequired,
        group: PropTypes.number.isRequired,
    }).isRequired,
    userHaveWords: PropTypes.bool.isRequired,
    fetchWords: PropTypes.func.isRequired,
    setGroup: PropTypes.func.isRequired,
    setUserWords: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);

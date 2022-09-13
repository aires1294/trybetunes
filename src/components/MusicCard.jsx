import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    // favorite: [],
    teste: false,
  };

  componentDidMount() {
    this.takeFavorite();
  }

  takeFavorite = async () => {
    const response = await getFavoriteSongs();
    const { trackName } = this.props;
    // this.setState({ favorite: response });
    this.setState({ teste: response
      .filter((elem) => elem.trackName === trackName).length !== 0 });
  };

  handleChange = async ({ target }) => {
    const { music } = this.props;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(music);
      await this.takeFavorite();
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId } = this.props;
    const {

      loading, teste } = this.state;
    return (
      <ul>
        { loading && <Loading /> }
        <li>
          {trackName}
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            <code>audio</code>
          </audio>
          <label htmlFor="check">
            Favorita
            <input
              name="favorites"
              id="check"
              type="checkbox"
              onChange={ this.handleChange }
              checked={ teste }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </li>
      </ul>
    );
  }
}

MusicCard.defaultProps = {
  favorite: {},
};

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  music: PropTypes.shape({}),
  favorite: PropTypes.shape({}),
}.isRequired;

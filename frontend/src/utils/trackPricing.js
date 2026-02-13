export const resolveTrackPricing = (promoTrack, tracks = []) => {
  if (!promoTrack) {
    return null;
  }

  if (promoTrack.track_pricing !== null && promoTrack.track_pricing !== undefined && promoTrack.track_pricing !== '') {
    const directValue = Number(promoTrack.track_pricing);
    return Number.isNaN(directValue) ? null : directValue;
  }

  const trackId = promoTrack.track_id ?? promoTrack.trackId;
  let matchedTrack = null;

  if (trackId !== null && trackId !== undefined && trackId !== '') {
    matchedTrack = tracks.find((track) => track.id === Number(trackId));
  }

  if (!matchedTrack && promoTrack.title) {
    matchedTrack = tracks.find(
      (track) =>
        track.title === promoTrack.title &&
        (promoTrack.album_id == null || track.album_id === promoTrack.album_id)
    );
  }

  if (!matchedTrack) {
    return null;
  }

  const matchedValue = Number(matchedTrack.track_pricing);
  return Number.isNaN(matchedValue) ? null : matchedValue;
};

-- Update artist_country to 'USA' for specified artists
UPDATE artists 
SET artist_country = 'USA'
WHERE name IN (
  'Whitney Houston',
  'Alsou',
  'Anthony Brown',
  'BabyFace',
  'Britney Spears',
  'Deagngelo',
  'Alexis FFrench',
  'Great Soul',
  'Lionel Richie',
  'Luther Vandross',
  'Mary j Blige',
  'Michael Jackson',
  'Samantha Mumba',
  'Spice Girls',
  'Stevie Wonder',
  'Usher'
);

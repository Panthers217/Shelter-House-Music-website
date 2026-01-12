-- Update bio, career_highlights, and influences for specific artists

UPDATE artists
SET 
  bio = CASE name
    WHEN 'Whitney Houston' THEN 'Whitney Houston was an iconic American singer and actress, known as "The Voice" for her powerful vocals and incredible range. She became one of the best-selling music artists of all time, with her influence spanning pop, R&B, soul, and gospel music. Her legacy continues to inspire generations of artists worldwide.'
    WHEN 'Alsou' THEN 'Alsou is a Russian pop singer who gained international recognition after representing Russia at Eurovision. Known for her melodic voice and captivating performances, she has become one of the most successful pop artists in Russia, blending contemporary pop with traditional influences.'
    WHEN 'Anthony Brown' THEN 'Anthony Brown is a renowned gospel music artist and worship leader, known for his powerful messages and soulful performances. As the leader of group therAPy, he has become a influential figure in contemporary gospel music, inspiring audiences with his authentic worship style.'
    WHEN 'BabyFace' THEN 'Kenneth "Babyface" Edmonds is a legendary R&B singer, songwriter, and producer who has shaped the sound of modern soul music. With his smooth vocals and masterful production skills, he has written and produced hits for countless artists while maintaining a successful solo career.'
    WHEN 'Britney Spears' THEN 'Britney Spears is a pop icon who defined a generation with her catchy songs, innovative music videos, and electrifying performances. Rising to fame in the late 1990s, she became one of the best-selling music artists of all time and a cultural phenomenon that shaped modern pop music.'
    WHEN 'Deagngelo' THEN 'D\'Angelo is a pioneering neo-soul artist whose innovative approach to R&B has influenced countless musicians. Known for his sultry vocals, complex arrangements, and musical virtuosity, he helped define the neo-soul movement and continues to push creative boundaries.'
    WHEN 'Alexis FFrench' THEN 'Alexis Ffrench is a British contemporary classical pianist and composer who bridges the gap between classical and popular music. His emotive compositions and virtuoso performances have made him one of the UK\'s most successful classical artists, bringing piano music to new audiences.'
    WHEN 'Great Soul' THEN 'Great Soul is an emerging artist bringing fresh energy to the soul music scene. With powerful vocals and heartfelt lyrics, they continue the rich tradition of soul music while incorporating modern elements that resonate with contemporary audiences.'
    WHEN 'Lionel Richie' THEN 'Lionel Richie is a legendary singer, songwriter, and producer whose smooth voice and timeless ballads have made him one of the most successful artists in music history. From his work with The Commodores to his illustrious solo career, his songs have become anthems of love and celebration.'
    WHEN 'Luther Vandross' THEN 'Luther Vandross was a masterful R&B vocalist whose velvety voice and impeccable phrasing set the gold standard for soul music. His romantic ballads and passionate performances earned him multiple Grammy Awards and secured his place as one of the greatest singers of all time.'
    WHEN 'Mary j Blige' THEN 'Mary J. Blige, known as the "Queen of Hip-Hop Soul," revolutionized R&B by blending hip-hop beats with soulful vocals and raw emotional honesty. Her powerful voice and authentic storytelling have made her one of the most influential and successful artists in contemporary music.'
    WHEN 'Michael Jackson' THEN 'Michael Jackson, the "King of Pop," was a global phenomenon who revolutionized music, dance, and entertainment. His groundbreaking albums, innovative music videos, and electrifying performances made him the most successful entertainer of all time, with an influence that transcends generations and genres.'
    WHEN 'Samantha Mumba' THEN 'Samantha Mumba is an Irish singer and actress who gained international success with her blend of R&B, pop, and dance music. Her debut album showcased her versatile vocals and contemporary sound, establishing her as a prominent artist in the early 2000s pop scene.'
    WHEN 'Spice Girls' THEN 'The Spice Girls were a British pop phenomenon that defined the 1990s with their message of "Girl Power" and infectious pop anthems. As one of the best-selling girl groups of all time, they became a global cultural force, influencing fashion, music, and popular culture worldwide.'
    WHEN 'Stevie Wonder' THEN 'Stevie Wonder is a musical genius whose innovative approach to soul, funk, and R&B has made him one of the most celebrated artists in music history. A multi-instrumentalist, singer, and songwriter, his socially conscious lyrics and groundbreaking production techniques have influenced generations of musicians.'
    WHEN 'Usher' THEN 'Usher is a multi-talented R&B superstar known for his smooth vocals, dynamic performances, and chart-topping hits. As one of the best-selling music artists of his generation, he has helped shape modern R&B while showcasing exceptional dancing and showmanship.'
  END,
  career_highlights = CASE name
    WHEN 'Whitney Houston' THEN '• 6 Grammy Awards and 30 Billboard Music Awards\n• Best-selling single "I Will Always Love You"\n• Starred in "The Bodyguard" (1992)\n• First artist to have seven consecutive #1 hits\n• Over 200 million records sold worldwide'
    WHEN 'Alsou' THEN '• Represented Russia at Eurovision Song Contest 2000\n• Multiple Russian Music Awards\n• Platinum-selling albums in Russia\n• Successful acting career in Russian cinema\n• International tours across Europe and Asia'
    WHEN 'Anthony Brown' THEN '• Multiple Stellar Gospel Music Awards\n• Dove Award nominations\n• Chart-topping gospel albums\n• Influential worship leader and pastor\n• Inspiring performances at major gospel events'
    WHEN 'BabyFace' THEN '• 12 Grammy Awards as artist and producer\n• Written and produced over 26 #1 R&B hits\n• Produced for Whitney Houston, Boyz II Men, Toni Braxton\n• Co-founder of LaFace Records\n• Inducted into Songwriters Hall of Fame'
    WHEN 'Britney Spears' THEN '• "...Baby One More Time" became a global phenomenon\n• 6 #1 albums on Billboard 200\n• Grammy Award winner\n• Over 100 million records sold worldwide\n• MTV Video Vanguard Award recipient'
    WHEN 'Deagngelo' THEN '• Grammy Award-winning artist\n• Critically acclaimed albums "Brown Sugar" and "Voodoo"\n• Pioneered the neo-soul movement\n• Collaborated with hip-hop and R&B legends\n• Known for innovative live performances'
    WHEN 'Alexis FFrench' THEN '• Multiple classical chart-topping albums\n• Over 100 million streams worldwide\n• Performed at prestigious venues including Royal Albert Hall\n• Ambassador for music education\n• Blending classical with contemporary sounds'
    WHEN 'Great Soul' THEN '• Rising star in contemporary soul music\n• Growing fanbase across digital platforms\n• Powerful live performances\n• Authentic storytelling through music\n• Carrying forward the soul music tradition'
    WHEN 'Lionel Richie' THEN '• 4 Grammy Awards and Academy Award winner\n• Over 125 million records sold worldwide\n• Inducted into Songwriters Hall of Fame\n• Kennedy Center Honors recipient\n• Chart-topping hits spanning five decades'
    WHEN 'Luther Vandross' THEN '• 8 Grammy Awards\n• Sold over 40 million records worldwide\n• 13 platinum albums\n• Legendary performances at Apollo Theater\n• Influenced generations of R&B vocalists'
    WHEN 'Mary j Blige' THEN '• 9 Grammy Awards from 32 nominations\n• Over 80 million records sold worldwide\n• Academy Award nominations for acting and music\n• Billboard\'s Icon Award recipient\n• Pioneered hip-hop soul genre'
    WHEN 'Michael Jackson' THEN '• 13 Grammy Awards and Grammy Legend Award\n• "Thriller" is best-selling album of all time\n• Pioneered modern music video artform\n• Inducted into Rock and Roll Hall of Fame twice\n• Over 400 million records sold worldwide'
    WHEN 'Samantha Mumba' THEN '• Debut single "Gotta Tell You" reached Top 5 worldwide\n• Platinum-selling debut album\n• MTV Europe Music Award nomination\n• Successful transition to acting\n• International tours across Europe and Asia'
    WHEN 'Spice Girls' THEN '• Best-selling girl group of all time\n• 9 #1 singles in the UK\n• "Wannabe" topped charts in 37 countries\n• Over 100 million records sold worldwide\n• Brit Awards and MTV Awards winners'
    WHEN 'Stevie Wonder' THEN '• 25 Grammy Awards including Lifetime Achievement\n• Inducted into Rock and Roll Hall of Fame\n• Presidential Medal of Freedom recipient\n• Over 100 million records sold worldwide\n• Pioneer in use of synthesizers in R&B'
    WHEN 'Usher' THEN '• 8 Grammy Awards\n• Over 80 million records sold worldwide\n• Multiple diamond-certified singles\n• Super Bowl Halftime Show performer\n• Mentor and discoverer of Justin Bieber'
  END,
  influences = CASE name
    WHEN 'Whitney Houston' THEN 'Aretha Franklin, Chaka Khan, Dionne Warwick, Gospel music'
    WHEN 'Alsou' THEN 'Russian pop music, Western pop artists, Eurovision performers'
    WHEN 'Anthony Brown' THEN 'Traditional Gospel, Kirk Franklin, Contemporary worship music'
    WHEN 'BabyFace' THEN 'Marvin Gaye, Stevie Wonder, The Isley Brothers, Smokey Robinson'
    WHEN 'Britney Spears' THEN 'Madonna, Janet Jackson, Michael Jackson, Prince'
    WHEN 'Deagngelo' THEN 'Marvin Gaye, Prince, Al Green, Curtis Mayfield'
    WHEN 'Alexis FFrench' THEN 'Chopin, Debussy, Ludovico Einaudi, Max Richter'
    WHEN 'Great Soul' THEN 'Classic soul artists, Contemporary R&B, Gospel music'
    WHEN 'Lionel Richie' THEN 'Nat King Cole, Sam Cooke, Marvin Gaye, Smokey Robinson'
    WHEN 'Luther Vandross' THEN 'Aretha Franklin, Dionne Warwick, Stevie Wonder, Diana Ross'
    WHEN 'Mary j Blige' THEN 'Aretha Franklin, Chaka Khan, Anita Baker, Hip-Hop culture'
    WHEN 'Michael Jackson' THEN 'James Brown, Jackie Wilson, Diana Ross, Fred Astaire'
    WHEN 'Samantha Mumba' THEN 'Whitney Houston, Janet Jackson, Aaliyah, TLC'
    WHEN 'Spice Girls' THEN 'Madonna, Bananarama, Girl groups of the 60s, Pop culture'
    WHEN 'Stevie Wonder' THEN 'Ray Charles, Sam Cooke, Aretha Franklin, Jazz legends'
    WHEN 'Usher' THEN 'Michael Jackson, Marvin Gaye, Prince, Jodeci'
  END
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

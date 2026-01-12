import yt_dlp
import cloudinary
import cloudinary.uploader
import os
import tempfile

def download_youtube_audio(youtube_url):
    """
    Downloads audio from a YouTube URL using yt-dlp and returns the path to the audio file.
    """
    with tempfile.TemporaryDirectory() as temp_dir:
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'quiet': True
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=True)
            filename = ydl.prepare_filename(info)
            audio_file = os.path.splitext(filename)[0] + '.mp3'
            return audio_file

def upload_to_cloudinary(audio_path, cloudinary_config):
    """
    Uploads the audio file to Cloudinary.
    """
    cloudinary.config(
        cloud_name=cloudinary_config['cloud_name'],
        api_key=cloudinary_config['api_key'],
        api_secret=cloudinary_config['api_secret']
    )
    response = cloudinary.uploader.upload(
        audio_path,
        resource_type="video",  # Cloudinary treats audio as 'video' resource type
        folder="youtube_audio_uploads"
    )
    return response['secure_url']

def main():
    youtube_url = input("Enter YouTube URL: ")
    cloudinary_config = {
        'cloud_name': os.getenv('CLOUDINARY_CLOUD_NAME'),
        'api_key': os.getenv('CLOUDINARY_API_KEY'),
        'api_secret': os.getenv('CLOUDINARY_API_SECRET')
    }
    print("Downloading audio...")
    audio_path = download_youtube_audio(youtube_url)
    print(f"Audio downloaded to {audio_path}")
    print("Uploading to Cloudinary...")
    url = upload_to_cloudinary(audio_path, cloudinary_config)
    print(f"Uploaded to Cloudinary: {url}")
    os.remove(audio_path)
    print("Temporary audio file removed.")

if __name__ == "__main__":
    main()

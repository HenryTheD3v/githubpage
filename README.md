# 🎬 Video Host

A simple personal video library designed for GitHub Pages.

## Adding a video

1. Put your `.mp4` inside `videos/`.
2. Open `videos.json`.
3. Add an entry:

```json
{
  "id": "minecraft-test-1",
  "title": "Minecraft Test #1",
  "description": "Testing my Minecraft clone",
  "file": "videos/minecraft-test-1.mp4"
}
```

4. Commit and push the changes.
5. GitHub Pages will publish the updated site.

### File size

Regular GitHub repository files must stay below GitHub's per-file limit. For larger videos, use Git LFS or GitHub Releases instead.

## GitHub Pages

In your repository:

**Settings → Pages → Deploy from a branch → main → / (root)**

Your site will be available at:

`https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`

## Share a specific video

When you open a video, the URL becomes:

`https://YOUR_USERNAME.github.io/REPOSITORY_NAME/?video=minecraft-test-1`

You can copy that URL with the **Copy link** button.

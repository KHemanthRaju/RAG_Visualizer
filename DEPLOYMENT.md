# Deployment Guide - Free Hosting Options

This guide covers free hosting options for the RAG Process Visualizer.

## 🚀 Recommended: Vercel (Best for Next.js)

**Why Vercel?**
- Created by the Next.js team - perfect integration
- Zero configuration needed
- Free tier includes:
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Global CDN
  - Preview deployments for every PR

### Deployment Steps:

#### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** (already done ✅)

2. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up with GitHub (free)

3. **Import Project**
   - Click "Add New Project"
   - Select your `RAG_Visualizer` repository
   - Vercel auto-detects Next.js settings

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live! 🎉

5. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain

**Your site will be live at:** `https://rag-visualizer.vercel.app` (or similar)

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /Users/etloaner/hemanth/RAG_Visualizer
vercel

# Follow prompts - it's that simple!
```

---

## 🌐 Alternative: Netlify

**Free Tier Includes:**
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Form handling

### Deployment Steps:

1. **Push to GitHub** (already done ✅)

2. **Go to Netlify**
   - Visit: https://www.netlify.com
   - Sign up with GitHub

3. **New Site from Git**
   - Click "Add new site" > "Import an existing project"
   - Select GitHub > Choose `RAG_Visualizer`
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

**Note:** For Next.js on Netlify, you may need `next.config.js` adjustments or use Netlify's Next.js plugin.

---

## 🚂 Alternative: Railway

**Free Tier:**
- $5 credit/month (enough for small apps)
- Automatic deployments from GitHub
- PostgreSQL included

### Deployment Steps:

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `RAG_Visualizer`

3. **Configure**
   - Railway auto-detects Next.js
   - Add environment variables if needed
   - Deploy!

---

## 🎨 Alternative: Render

**Free Tier:**
- 750 hours/month
- Automatic SSL
- Auto-deploy from GitHub

### Deployment Steps:

1. **Go to Render**
   - Visit: https://render.com
   - Sign up with GitHub

2. **New Web Service**
   - Connect your GitHub repo
   - Select `RAG_Visualizer`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Click "Create Web Service"

---

## 📋 Quick Comparison

| Platform | Best For | Free Tier | Ease of Use |
|----------|----------|-----------|-------------|
| **Vercel** | Next.js apps | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Netlify** | Static/Jamstack | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Railway** | Full-stack apps | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Render** | General hosting | ⭐⭐⭐ | ⭐⭐⭐ |

## 🎯 My Recommendation

**Use Vercel** - It's specifically designed for Next.js and offers:
- Zero configuration
- Automatic deployments
- Best performance
- Free custom domain
- Preview URLs for every commit

## 📝 Pre-Deployment Checklist

Before deploying, ensure:

- [x] Code is pushed to GitHub
- [ ] `.env` files are not committed (use `.gitignore`)
- [ ] `package.json` has correct scripts
- [ ] No hardcoded localhost URLs
- [ ] All dependencies are in `package.json`

## 🔧 Environment Variables (if needed later)

If you add real APIs later, set environment variables in your hosting platform:

- `OPENAI_API_KEY` (if using OpenAI)
- `VECTOR_DB_API_KEY` (if using Pinecone, etc.)

## 🚀 Quick Start Command

**For Vercel (fastest):**
```bash
npm i -g vercel
cd /Users/etloaner/hemanth/RAG_Visualizer
vercel
```

That's it! Your site will be live in under 2 minutes.

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify Next.js Guide](https://docs.netlify.com/integrations/frameworks/next-js/)

---

**Need help?** Check the Troubleshooting section in the wiki or open an issue on GitHub.


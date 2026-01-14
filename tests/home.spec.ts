import { test, expect } from '@playwright/test';

test.describe('Home Page Dynamic Content', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API calls to avoid actual network requests in tests
    await page.route('http://localhost:5000/api/projects', async route => {
      const json = [
        { id: '1', title: { fr: 'Projet Test 1', en: 'Test Project 1' }, description: { fr: 'Description 1', en: 'Description 1' }, technologies: ['React'], imageUrl: '', projectUrl: '', repoUrl: '' },
        { id: '2', title: { fr: 'Projet Test 2', en: 'Test Project 2' }, description: { fr: 'Description 2', en: 'Description 2' }, technologies: ['Vue'], imageUrl: '', projectUrl: '', repoUrl: '' },
      ];
      await route.fulfill({ json });
    });
    await page.route('http://localhost:5000/api/blogposts', async route => {
      const json = [
        { id: '1', title: { fr: 'Article 1', en: 'Post 1' }, summary: { fr: 'Résumé 1', en: 'Summary 1' }, content: {fr: '', en: ''}, slug: 'post-1', author: 'Jules', publishedAt: new Date().toISOString(), tags: ['Tech'] },
        { id: '2', title: { fr: 'Article 2', en: 'Post 2' }, summary: { fr: 'Résumé 2', en: 'Summary 2' }, content: {fr: '', en: ''}, slug: 'post-2', author: 'Jules', publishedAt: new Date().toISOString(), tags: ['Code'] },
      ];
      await route.fulfill({ json });
    });
    await page.route('http://localhost:5000/api/skills', async route => {
      await route.fulfill({ json: [] }); // Empty for now, as it's not the focus
    });

    await page.goto('http://localhost:5173/');
  });

  test('should display featured projects fetched from the API', async ({ page }) => {
    // Wait for the projects section to be visible
    await expect(page.locator('h2:has-text("Projets Récents")')).toBeVisible({ timeout: 10000 });

    // Check that project cards are rendered
    const projectCards = page.locator('section:has(h2:has-text("Projets Récents")) div.grid > div');
    await expect(projectCards).toHaveCount(2);

    // Check content of the first project card
    await expect(page.locator('h3:has-text("Projet Test 1")')).toBeVisible();
    await expect(page.locator('p:has-text("Description 1")')).toBeVisible();
  });

  test('should display featured blog posts fetched from the API', async ({ page }) => {
    // Wait for the blog posts section to be visible
    await expect(page.locator('h2:has-text("Articles Récents")')).toBeVisible({ timeout: 10000 });

    // Check that blog post cards are rendered
    const postCards = page.locator('section:has(h2:has-text("Articles Récents")) >> article');
    await expect(postCards).toHaveCount(2);

    // Check content of the first blog post card
    await expect(page.locator('h3:has-text("Article 1")')).toBeVisible();
    await expect(page.locator('p:has-text("Résumé 1")')).toBeVisible();
  });
});

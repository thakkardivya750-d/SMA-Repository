# Social Media Engagement Rate Calculator
## Mini Project Report

### 1. Introduction
Social media engagement rate is a metric used to understand how actively an audience interacts with published content. Likes, comments, shares, and saves are common interactions. This project provides a simple dashboard where a user enters post metrics and calculates an engagement rate.

### 2. Problem Statement
Manually calculating engagement rates for posts can be inconvenient and inconsistent. Users may also find it difficult to compare interactions with follower count versus actual reach. The application brings these calculations and a basic history into one easy-to-use interface.

### 3. Objectives
- Calculate a follower-based engagement rate.
- Calculate a reach-based rate when reach is supplied.
- Validate input values and show useful error messages.
- Explain results with a simple interpretation.
- Save previous calculations in the browser.
- Export saved results to CSV.

### 4. Scope
The app supports manually entered metrics for Instagram, TikTok, Facebook, YouTube, X, LinkedIn, and other platforms. It is intended for learning and demonstration. It does not connect to platform APIs or fetch real-time account analytics.

### 5. Technology Stack
- HTML5: page structure and form controls.
- CSS3: layout, responsive design, cards, themes, and visual presentation.
- JavaScript: input validation, calculations, rendering, localStorage, and CSV export.
- Browser localStorage: locally saves the calculation history.

### 6. Methodology
1. User selects a social platform.
2. User enters follower count and interaction metrics.
3. The application checks that follower count is greater than zero and other numeric values are valid.
4. The application adds likes, comments, shares, and saves to calculate total interactions.
5. It divides total interactions by followers and multiplies by 100.
6. If reach is entered, the app also divides total interactions by reach and multiplies by 100.
7. Results are shown and the calculation is saved in browser storage.
8. The user can review, delete, or export saved history.

### 7. Mathematical Formula
Total Interactions = Likes + Comments + Shares + Saves

Follower-based Engagement Rate (%) = (Total Interactions / Followers) × 100

Reach-based Engagement Rate (%) = (Total Interactions / Reach) × 100

### 8. Example
Assume a post has 12,500 followers, 860 likes, 74 comments, 32 shares, and 55 saves.

Total interactions = 860 + 74 + 32 + 55 = 1,021

Follower-based rate = (1,021 / 12,500) × 100 = 8.17%

If the post reach is 9,800:

Reach-based rate = (1,021 / 9,800) × 100 = 10.42%

### 9. Main Modules
- Dashboard and navigation
- Input form and validation
- Engagement calculation engine
- Result and benchmark interpretation
- Local calculation history
- CSV export
- Learning guide

### 10. Testing
| Test case | Input / action | Expected result |
|---|---|---|
| Valid data | Followers > 0 and valid interactions | Correct rate displayed |
| Zero followers | Followers = 0 | Validation error |
| Negative values | Any metric below 0 | Validation error |
| Decimal interactions | Likes or comments such as 2.5 | Whole-number validation error |
| Reach omitted | Reach blank | Follower-based rate only |
| Reach supplied | Reach > 0 | Both rates shown |
| Save history | Calculate a result | Row appears in history |
| Delete row | Click delete | Selected row removed |
| CSV export | History contains results | CSV file downloads |
| Responsive layout | Open on mobile width | Layout adapts to screen |

### 11. Limitations
- Metrics must be entered manually.
- No social-media API connection or authentication.
- History is local to one browser and device.
- Benchmark categories are broad educational guidance and not universal industry standards.

### 12. Future Enhancements
- Connect approved platform APIs where available.
- Add date-wise charts and post comparisons.
- Support campaign-level summaries.
- Add login and cloud database for multi-device history.
- Add PDF report generation.

### 13. Conclusion
The Social Media Engagement Rate Calculator demonstrates how a common social-media metric can be calculated and presented through a responsive web application. It combines data validation, formula-based computation, local history, and export functionality in a simple interface suitable for a college project demonstration.

# Contributing to StudyHall

First off, thank you for considering contributing to StudyHall! 🎉

It's people like you that make StudyHall such a great educational tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Collaborative**: Work together to improve the project
- **Be Inclusive**: Welcome newcomers and diverse perspectives
- **Be Professional**: Focus on constructive feedback

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React and Node.js

### Fork the Repository

1. Fork the StudyHall repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/studyhall.git
   cd studyhall
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/studyhall.git
   ```

---

## How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**
- Check the existing issues to avoid duplicates
- Collect information about the bug (screenshots, error messages, steps to reproduce)
- Test if the bug exists in the latest version

**When submitting a bug report, include:**
- **Title**: Clear and descriptive
- **Description**: Detailed description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: OS, Node version, browser

**Bug Report Template:**
```markdown
**Bug Description**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10, macOS 12]
- Node Version: [e.g. 14.17.0]
- Browser: [e.g. Chrome 95]
```

### Suggesting Enhancements

**Before submitting an enhancement:**
- Check if the enhancement already exists in issues
- Determine if it fits the project scope
- Consider if it benefits most users

**When submitting an enhancement:**
- **Title**: Clear feature description
- **Problem**: Describe the problem it solves
- **Solution**: Your proposed solution
- **Alternatives**: Other solutions considered
- **Additional Context**: Mockups, examples, references

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

---

## Development Setup

### 1. Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 3. Access the App

Open http://localhost:3001 in your browser

### 4. Make Your Changes

- Create a new branch: `git checkout -b feature/my-feature`
- Make your changes
- Test thoroughly
- Commit your changes

---

## Pull Request Process

### Before Submitting

1. **Test Your Changes**
   - Run the app and test all affected features
   - Check for console errors
   - Test on different browsers if UI changes

2. **Update Documentation**
   - Update README.md if needed
   - Add JSDoc comments for new functions
   - Update relevant documentation files

3. **Code Quality**
   - Follow the style guidelines
   - Remove console.logs and debug code
   - Check ESLint warnings

4. **Commit Messages**
   - Write clear, descriptive commit messages
   - Follow the commit message guidelines

### Submitting a Pull Request

1. **Push to Your Fork**
   ```bash
   git push origin feature/my-feature
   ```

2. **Create Pull Request**
   - Go to GitHub and create a PR from your fork
   - Fill out the PR template completely
   - Link related issues using `Fixes #123`

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   How has this been tested?

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Commented complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   - [ ] Tests added if applicable
   ```

4. **Wait for Review**
   - Maintainers will review your PR
   - Address any requested changes
   - Be patient and responsive

---

## Style Guidelines

### JavaScript Style

- Use ES6+ syntax
- Use `const` and `let`, avoid `var`
- Use template literals for string concatenation
- Use arrow functions for callbacks
- Destructure objects and arrays when possible
- Use async/await over promises when applicable

**Example:**
```javascript
// Good
const getUserData = async (userId) => {
  const { data } = await axios.get(`/api/user/${userId}`);
  return data;
};

// Avoid
var getUserData = function(userId) {
  return axios.get('/api/user/' + userId).then(function(response) {
    return response.data;
  });
};
```

### React Style

- Use functional components
- Use hooks (useState, useEffect, etc.)
- Extract complex logic into custom hooks
- Keep components small and focused
- Use PropTypes or TypeScript for props
- Avoid inline styles, use CSS files

**Example:**
```javascript
// Good
function MyComponent({ title, onAction }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Effect logic
  }, [count]);

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={onAction}>Click</button>
    </div>
  );
}

// Avoid
class MyComponent extends React.Component {
  // Class component
}
```

### CSS Style

- Use BEM naming convention
- Keep selectors specific
- Group related properties
- Use CSS variables for colors
- Mobile-first responsive design

**Example:**
```css
/* Good */
.leaderboard-item {
  display: flex;
  padding: 20px;
}

.leaderboard-item__title {
  font-size: 18px;
  color: var(--primary-color);
}

.leaderboard-item--active {
  background: var(--active-bg);
}
```

### File Naming

- Components: PascalCase (`MyComponent.js`)
- Utilities: camelCase (`slimeSprites.js`)
- CSS: Match component name (`MyComponent.css`)
- Constants: UPPER_SNAKE_CASE

---

## Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Build process or auxiliary tool changes

### Examples

```
feat(leaderboard): add sorting by best streak

Added new sort option for leaderboard to display players
sorted by their best answer streak.

Closes #123
```

```
fix(slime-shop): resolve pack purchase error

Fixed issue where purchasing packs would sometimes fail
due to race condition in currency update.

Fixes #456
```

```
docs(readme): update installation instructions

Added more detailed steps for Windows users having
npm installation issues.
```

---

## Project Structure

When adding new files, follow this structure:

```
client/src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
│   └── games/          # Game mode components
├── utils/              # Utility functions
└── [App files]

[Root]/
├── server.js           # Backend server
├── database.js         # Database operations
└── [Documentation]
```

---

## Testing Guidelines

While we don't have automated tests yet, manually test:

### Frontend
- UI appears correctly
- Buttons and links work
- Forms validate properly
- Responsive design works
- No console errors

### Backend
- API endpoints return correct data
- Database operations succeed
- WebSocket events work
- Error handling works
- No server crashes

### Integration
- Frontend connects to backend
- Real-time updates work
- Game flow works end-to-end
- User authentication works

---

## Documentation Guidelines

### Code Comments

- Explain **why**, not **what**
- Comment complex logic
- Use JSDoc for functions
- Keep comments up-to-date

**Example:**
```javascript
/**
 * Calculate sell price for a slime based on rarity
 * @param {string} rarity - The rarity of the slime
 * @returns {number} The sell price in currency
 */
function getSlimeSellPrice(rarity) {
  const rarityPrices = {
    common: 50,
    uncommon: 100,
    rare: 200,
    epic: 400,
    legendary: 800
  };
  return rarityPrices[rarity] || 0;
}
```

### Documentation Files

- Update README.md for user-facing changes
- Update relevant guides for new features
- Create new guide files for major features
- Keep documentation clear and concise

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat (coming soon)
- **Email**: For sensitive issues

### Getting Help

- Search existing issues first
- Ask in Discussions for questions
- Tag maintainers if urgent
- Be patient and respectful

---

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Invited to contributor channel
- Given a contributor badge

---

## Questions?

If you have questions about contributing, feel free to:
- Open a Discussion on GitHub
- Comment on related issues
- Reach out to maintainers

---

**Thank you for contributing to StudyHall! 🎉🎓**

Together, we're making education more fun and engaging for everyone!


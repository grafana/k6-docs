---
title: k6 Community extensions
---

| Extension | Description | Versions |
| --------- | ----------- | -------- |
| <span id="loading-indicator">Loading official extensions...</span> | | |

<script>
async function loadCommunityExtensions() {
  try {
    const response = await fetch('https://registry.k6.io/catalog.json');
    const catalog = await response.json();
    
    // Filter for official extensions only
    const communityExtensions = Object.entries(catalog)
      .filter(([_, ext]) => ext.tier === 'official')
      .map(([name, ext]) => ({
        name,
        description: ext.description,
        url: ext.repo.url,
        repoName: ext.repo.name,
        versions: ext.versions.join(', ')
      }))
      .sort((a, b) => a.repoName.localeCompare(b.repoName));

    // Find the table and its tbody
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows for each official extension
    communityExtensions.forEach(ext => {
      const row = tbody.insertRow();
      
      // Extension name with link
      const nameCell = row.insertCell();
      nameCell.innerHTML = `<a href="${ext.url}" target="_blank" rel="noopener">${ext.repoName}</a>`;
      
      // Description
      const descCell = row.insertCell();
      descCell.textContent = ext.description;
      
      // Versions
      const versionCell = row.insertCell();
      versionCell.innerHTML = `<code>${ext.versions}</code>`;
    });
    
  } catch (error) {
    console.error('Error loading official extensions:', error);
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="color: red; text-align: center;">
          Error loading official extensions. Please refresh the page or check the console for details.
        </td>
      </tr>
    `;
  }
}

// Load extensions when the page loads
document.addEventListener('DOMContentLoaded', loadCommunityExtensions);

// Fallback for pages that might already be loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCommunityExtensions);
} else {
  loadCommunityExtensions();
}
</script>

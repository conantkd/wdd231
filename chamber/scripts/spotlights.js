const membersUrl = 'data/members.json';
const spotlightsContainer = document.querySelector('#spotlights-container');

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (response.ok) {
      const members = await response.json();
      const qualified = members.filter(
        (member) => member.membershipLevel === 2 || member.membershipLevel === 3
      );
      const shuffled = shuffleArray(qualified);
      const selected = shuffled.slice(0, 3);
      displaySpotlights(selected);
    }
  } catch (error) {
    console.error(error);
  }
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getMembershipLabel(level) {
  return level === 3 ? 'Gold Member' : 'Silver Member';
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <div class="spotlight-header">
        <h3>${member.name}</h3>
        <p class="spotlight-level">${getMembershipLabel(member.membershipLevel)}</p>
      </div>
      <div class="spotlight-body">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
        <div class="spotlight-info">
          <p>${member.phone}</p>
          <p>${member.address}</p>
          <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://', '')}</a></p>
        </div>
      </div>
    `;

    spotlightsContainer.appendChild(card);
  });
}

getSpotlights();
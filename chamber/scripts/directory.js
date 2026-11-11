const url = '/data/members.json';
const directoryContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

async function getMembers() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayMembers(data);
    } else {
      console.error('Error fetching members data');
    }
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

function getMembershipName(level) {
  const levels = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
  };
  return levels[level] || 'Member';
}

function displayMembers(members) {
  directoryContainer.innerHTML = '';
  
  members.forEach((member) => {
    let currentLevel = member.membershipLevel || Math.floor(Math.random() * 3) + 1;

    const card = document.createElement('section');
    card.classList.add('member-card');
    
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="auto">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="tagline">${member.otherInfo}</p>
        <p><strong>LEVEL:</strong> ${getMembershipName(currentLevel)}</p>
        <p><strong>EMAIL:</strong> info@${member.website.replace('https://www.', '').replace('https://', '')}</p>
        <p><strong>PHONE:</strong> ${member.phone}</p>
        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
      </div>
    `;
    
    directoryContainer.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  directoryContainer.classList.add('grid');
  directoryContainer.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  directoryContainer.classList.add('list');
  directoryContainer.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

getMembers();
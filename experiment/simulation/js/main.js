//Your JavaScript goes in here
// Elements
const sampleSelect = document.getElementById('sample-select');
const testsList = document.getElementById('tests-list');
const resetButton = document.getElementById('reset-button');
const heatButton = document.getElementById('heat-button');
const labBench = document.getElementById('lab-bench');
const reagentsContainer = document.getElementById('reagents-container');
const testTube = document.getElementById('test-tube');
const tubeContent = document.getElementById('tube-content');
const tubePrecipitate = document.getElementById('tube-precipitate');
const flame = document.getElementById('flame');
const waterBath = document.getElementById('water-bath');
const waterLevel = document.getElementById('water-level');
const observationText = document.getElementById('observation-text');
const explanationText = document.getElementById('explanation-text');

// State
let selectedSample = null;
let selectedTest = null;
let currentStep = 0;
let addedReagents = [];
let heating = false;

// Data definition for reagents and tests
const reagentDefs = {
  "glucose": { emoji: "🍬", color: "#ffd966" },
  "fructose": { emoji: "🍭", color: "#ffc966" },
  "sucrose": { emoji: "🍫", color: "#f4c542" },
  "starch": { emoji: "🍚", color: "#fff3b0" },
  "ribose": { emoji: "🍡", color: "#fff9b0" },

  "benedict": { emoji: "🧪", color: "#2266cc" },
  "iodine": { emoji: "🧴", color: "#4a2f7f" },
  "molisch": { emoji: "⚗", color: "#2f4468" },
  "sulfuric": { emoji: "🧪", color: "#f48c06" },
  "barfoed": { emoji: "🧪", color: "#3a9d23" },
  "seliwanoff": { emoji: "🧪", color: "#f28c00" },
  "bial": { emoji: "🧪", color: "#1e6f52" },
  "fehlingA": { emoji: "🧪", color: "#0e6eb8" },
  "fehlingB": { emoji: "🧪", color: "#b86e00" }
};

const testsInfo = {
  benedict: {
    name: "Benedict's Test",
    reagents: ["glucose", "benedict"],
    heatRequired: true,
    procedure: [
      "Add 2 mL of carbohydrate solution to the test tube.",
      "Add 2 mL Benedict's solution.",
      "Heat the mixture.",
      "Observe changes."
    ],
    explanation: "Benedict's solution detects reducing sugars producing brick-red precipitate when heated."
  },
  iodine: {
    name: "Iodine Test",
    reagents: ["starch", "iodine"],
    heatRequired: false,
    procedure: [
      "Add 2 mL of carbohydrate solution to the test tube.",
      "Add a few drops of iodine solution.",
      "Observe color change immediately."
    ],
    explanation: "Iodine reacts with starch producing a blue-black color."
  },
  molisch: {
    name: "Molisch's Test",
    reagents: ["glucose", "molisch", "sulfuric"],
    heatRequired: false,
    procedure: [
      "Add 2 mL carbohydrate solution to test tube.",
      "Add 2 drops Molisch's reagent.",
      "Carefully add 1 mL concentrated sulfuric acid down the side.",
      "Observe the purple ring at interface."
    ],
    explanation: "Molisch's test detects carbohydrates giving purple ring at acid-organic interface."
  },
  barfoed: {
    name: "Barfoed's Test",
    reagents: ["fructose", "barfoed"],
    heatRequired: true,
    procedure: [
      "Add 2 mL carbohydrate solution to test tube.",
      "Add 2 mL Barfoed's reagent.",
      "Heat for 3 minutes.",
      "Observe red precipitate."
    ],
    explanation: "Barfoed's test distinguishes monosaccharides, which reduce copper faster producing red precipitate."
  },
  seliwanoff: {
    name: "Seliwanoff's Test",
    reagents: ["fructose", "seliwanoff"],
    heatRequired: true,
    procedure: [
      "Add 2 mL carbohydrate solution to test tube.",
      "Add 2 mL Seliwanoff's reagent.",
      "Heat for 1 minute.",
      "Observe cherry red color."
    ],
    explanation: "Seliwanoff's test distinguishes ketoses like fructose by cherry red color on heating."
  },
  bial: {
    name: "Bial's Test",
    reagents: ["ribose", "bial"],
    heatRequired: true,
    procedure: [
      "Add 2 mL carbohydrate solution to test tube.",
      "Add 2 mL Bial's reagent.",
      "Heat for 2 minutes.",
      "Observe blue-green color."
    ],
    explanation: "Bial's test detects pentoses producing blue-green color when heated."
  },
  fehling: {
    name: "Fehling's Test",
    reagents: ["glucose", "fehlingA", "fehlingB"],
    heatRequired: true,
    procedure: [
      "Add 2 mL carbohydrate solution to test tube.",
      "Mix equal volumes Fehling's A and B reagent.",
      "Add mixture to test tube.",
      "Heat for 5 minutes.",
      "Observe brick red precipitate."
    ],
    explanation: "Fehling's test detects reducing sugars producing brick-red precipitate on heating."
  }
};

const expectedResults = {
  benedict: {
    glucose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" },
    fructose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" },
    sucrose: { positive: false, observation: "No color change, remains blue.", color:"#3274c4", precipitate:null },
    starch: { positive: false, observation: "No color change, remains blue.", color:"#3274c4", precipitate:null },
    ribose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" }
  },
  iodine: {
    starch: { positive: true, observation: "Solution turns blue-black.", color:"#111833", precipitate:null },
    glucose: { positive: false, observation: "No color change (yellow-brown).", color:"#a57c00", precipitate:null },
    fructose: { positive: false, observation: "No color change (yellow-brown).", color:"#a57c00", precipitate:null },
    sucrose: { positive: false, observation: "No color change (yellow-brown).", color:"#a57c00", precipitate:null },
    ribose: { positive: false, observation: "No color change (yellow-brown).", color:"#a57c00", precipitate:null }
  },
  molisch: {
    glucose: { positive: true, observation: "Purple ring at interface.", color:"#6a0dad", precipitate:null },
    fructose: { positive: true, observation: "Purple ring at interface.", color:"#6a0dad", precipitate:null },
    sucrose: { positive: true, observation: "Purple ring at interface.", color:"#6a0dad", precipitate:null },
    starch: { positive: true, observation: "Purple ring at interface.", color:"#6a0dad", precipitate:null },
    ribose: { positive: true, observation: "Purple ring at interface.", color:"#6a0dad", precipitate:null }
  },
  barfoed: {
    fructose: { positive: true, observation: "Red precipitate forms quickly.", color:"#a83124", precipitate:"#7f271a" },
    glucose: { positive: true, observation: "Red precipitate forms.", color:"#a83124", precipitate:"#7f271a" },
    sucrose: { positive: false, observation: "No precipitate.", color:"#4a90e2", precipitate:null },
    starch: { positive: false, observation: "No precipitate.", color:"#4a90e2", precipitate:null },
    ribose: { positive: true, observation: "Red precipitate forms.", color:"#a83124", precipitate:"#7f271a" }
  },
  seliwanoff: {
    fructose: { positive: true, observation: "Cherry red color develops.", color:"#d2042d", precipitate:null },
    glucose: { positive: false, observation: "Light pink/no significant change.", color:"#e8bebf", precipitate:null },
    sucrose: { positive: true, observation: "Cherry red color develops.", color:"#d2042d", precipitate:null },
    starch: { positive: false, observation: "No color change.", color:"#f5f5f5", precipitate:null },
    ribose: { positive: false, observation: "No color change.", color:"#f5f5f5", precipitate:null }
  },
  bial: {
    ribose: { positive: true, observation: "Blue-green color develops.", color:"#1e5945", precipitate:null },
    glucose: { positive: false, observation: "No characteristic color change.", color:"#d2d2d2", precipitate:null },
    fructose: { positive: false, observation: "No characteristic color change.", color:"#d2d2d2", precipitate:null },
    sucrose: { positive: false, observation: "No characteristic color change.", color:"#d2d2d2", precipitate:null },
    starch: { positive: false, observation: "No characteristic color change.", color:"#d2d2d2", precipitate:null }
  },
  fehling: {
    glucose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" },
    fructose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" },
    sucrose: { positive: false, observation: "No precipitate.", color:"#4a90e2", precipitate:null },
    starch: { positive: false, observation: "No precipitate.", color:"#4a90e2", precipitate:null },
    ribose: { positive: true, observation: "Brick-red precipitate forms.", color:"#b7410e", precipitate:"#a43205" }
  }
};

// Helper to create reagent bottle elements
function createReagentBottle(id, name, emoji, color, left) {
  const bottle = document.createElement('div');
  bottle.classList.add('reagent-bottle');
  bottle.setAttribute('draggable', 'true');
  bottle.setAttribute('data-id', id);
  bottle.style.background = `linear-gradient(135deg, ${color}bb, ${color}88)`;
  bottle.style.left = left + 'px';
  bottle.style.position = 'relative';
  bottle.style.flex = '0 0 auto';

  const emojiEl = document.createElement('div');
  emojiEl.classList.add('reagent-emoji');
  emojiEl.textContent = emoji;

  const nameEl = document.createElement('div');
  nameEl.classList.add('reagent-name');
  nameEl.textContent = name;

  bottle.appendChild(emojiEl);
  bottle.appendChild(nameEl);

  // Drag event handlers
  bottle.addEventListener('dragstart', e => {
    bottle.classList.add('dragging');
    e.dataTransfer.setData('text/plain', id);
  });
  bottle.addEventListener('dragend', e => {
    bottle.classList.remove('dragging');
  });
  return bottle;
}

// Render reagents for the selected test and sample
function renderReagents() {
  reagentsContainer.innerHTML = '';
  if (!selectedTest) return;

  // Show sample bottle first
  if (selectedSample) {
    const s = reagentDefs[selectedSample];
    const sampleBottle = createReagentBottle(selectedSample, 
      selectedSample.charAt(0).toUpperCase() + selectedSample.slice(1), 
      s.emoji, s.color, 10);
    reagentsContainer.appendChild(sampleBottle);
  }
  // Then test reagents except sample
  const testData = testsInfo[selectedTest];
  if (!testData) return;
  let baseLeft = 110;
  testData.reagents.forEach(r => {
    if (r !== selectedSample) {
      const reagent = reagentDefs[r];
      const bottle = createReagentBottle(r, reagent.name || r.charAt(0).toUpperCase() + r.slice(1), 
        reagent.emoji, reagent.color, baseLeft);
      reagentsContainer.appendChild(bottle);
      baseLeft += 90;
    }
  });
}

// Reset test tube - clear color and precipitate visually & logically
function resetTestTube() {
  tubeContent.style.backgroundColor = 'transparent';
  tubeContent.style.boxShadow = 'none';
  tubePrecipitate.style.backgroundColor = 'transparent';
  tubePrecipitate.style.boxShadow = 'none';
  tubePrecipitate.style.height = '0';
  addedReagents = [];
  currentStep = 0;
  observationText.textContent = "Drag reagents into the test tube following the procedure.";
  explanationText.textContent = testsInfo[selectedTest]?.explanation || '';
  heatButton.disabled = true;
  flame.classList.remove('active');
  waterBath.classList.remove('active');
}

// Update procedure display in sidebar
function updateProcedureHighlight() {
  if (!selectedTest) return;
  const procedure = testsInfo[selectedTest].procedure;
  let procedureText = procedure.map((step,i) => i === currentStep ? `➡ ${step}` : `- ${step}`).join('\n');
  observationText.textContent = procedureText;
}

// Add reagent to test tube if valid
function addReagentToTube(reagentId) {
  const testData = testsInfo[selectedTest];
  if (!testData || !selectedSample) return;

  const sequence = [selectedSample].concat(testData.reagents.filter(r => r !== selectedSample));

  if (addedReagents.length >= sequence.length) {
    observationText.textContent = "All reagents already added. Heat the test tube if required.";
    return;
  }

  // Validate reagent in sequence position
  if (reagentId !== sequence[addedReagents.length]) {
    observationText.textContent = `Please add ${sequence[addedReagents.length]} reagent next.`;
    return;
  }

  addedReagents.push(reagentId);
  // Visual effect: fill test tube with corresponding color portion
  let color = reagentDefs[reagentId]?.color || '#a3d2ca';
  tubeContent.style.backgroundColor = color;
  tubeContent.style.boxShadow = `inset 0 15px 30px ${color}cc`;

  updateProcedureHighlight();

  // Enable heat button if all reagents are added and heating is required
  if (addedReagents.length === sequence.length) {
    if (testData.heatRequired) {
      heatButton.disabled = false;
    }
  }
}

// Animate heating process
async function heatTestTube() {
  if (heating) return;
  heating = true;
  heatButton.disabled = true;
  observationText.textContent = "Heating in progress...";
  flame.classList.add('active');

  // Simulate heat duration (e.g., 3s)
  await new Promise(r => setTimeout(r, 3000));
  flame.classList.remove('active');

  // Show reaction results
  showReactionResult();

  heating = false;
}

// Show results based on selected test and sample
function showReactionResult() {
  if (!selectedTest || !selectedSample) return;

  const result = expectedResults[selectedTest]?.[selectedSample];

  if (!result) {
    observationText.textContent = "No visible reaction for this sample-test combination.";
    explanationText.textContent = testsInfo[selectedTest]?.explanation || '';
    tubeContent.style.backgroundColor = 'transparent';
    tubeContent.style.boxShadow = 'none';
    tubePrecipitate.style.backgroundColor = 'transparent';
    tubePrecipitate.style.boxShadow = 'none';
    tubePrecipitate.style.height = '0';
    return;
  }

  observationText.textContent = result.observation;
  explanationText.textContent = testsInfo[selectedTest].explanation;

  // Visual update based on presence of precipitate
  if (result.precipitate) {
    tubePrecipitate.style.backgroundColor = result.precipitate;
    tubePrecipitate.style.boxShadow = `0 0 12px 6px ${result.precipitate}bb`;
    tubePrecipitate.style.height = '30px';
  } else {
    tubePrecipitate.style.height = '0';
    tubePrecipitate.style.backgroundColor = 'transparent';
    tubePrecipitate.style.boxShadow = 'none';
  }

  // Adjust tube liquid color accordingly
  if (result.color) {
    tubeContent.style.backgroundColor = result.color;
    tubeContent.style.boxShadow = `inset 0 12px 25px ${result.color}cc`;
  }
}

// Drag and drop handlers for test-tube
function handleDragOver(event) {
  event.preventDefault();
}
function handleDrop(event) {
  event.preventDefault();
  const reagentId = event.dataTransfer.getData('text/plain');
  if (reagentId) addReagentToTube(reagentId);
}

// Selection change handlers
sampleSelect.addEventListener('change', e => {
  selectedSample = e.target.value;
  resetTestTube();
  if (selectedTest) renderReagents();
  heatButton.disabled = true;
  observationText.textContent = "Sample selected. Select a test.";
  explanationText.textContent = '';
});

testsList.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  // Deactivate other buttons
  Array.from(testsList.children).forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  selectedTest = e.target.getAttribute('data-test');
  resetTestTube();
  heatButton.disabled = true;
  tubeContent.style.backgroundColor = 'transparent';
  tubeContent.style.boxShadow = 'none';
  tubePrecipitate.style.backgroundColor = 'transparent';
  tubePrecipitate.style.boxShadow = 'none';
  if (selectedSample) renderReagents();
  observationText.textContent = "Test selected. Drag reagents into the test tube following the procedure.";
  explanationText.textContent = testsInfo[selectedTest]?.explanation || '';
});

resetButton.addEventListener('click', () => {
  selectedSample = null;
  selectedTest = null;
  currentStep = 0;
  addedReagents = [];
  sampleSelect.value = "";
  Array.from(testsList.children).forEach(b => b.classList.remove('active'));
  heatButton.disabled = true;
  tubeContent.style.backgroundColor = 'transparent';
  tubeContent.style.boxShadow = 'none';
  tubePrecipitate.style.backgroundColor = 'transparent';
  tubePrecipitate.style.boxShadow = 'none';
  observationText.textContent = "Select a carbohydrate sample and test to begin.";
  explanationText.textContent = '';
  reagentsContainer.innerHTML = '';
});

heatButton.addEventListener('click', heatTestTube);
testTube.addEventListener('dragover', handleDragOver);
testTube.addEventListener('drop', handleDrop);

// Render reagents on load
renderReagents();
document.addEventListener('DOMContentLoaded', () => {
    const educationSelect = document.getElementById('education');
    const networthSelect = document.getElementById('networth');
    const casteSelect = document.getElementById('caste');
    const skillMusicalCheckbox = document.getElementById('skill_musical');
    const skillCookCheckbox = document.getElementById('skill_cook');
    const skillEasygoingCheckbox = document.getElementById('skill_easygoing');
    const skillSingsCheckbox = document.getElementById('skill_sings');
    const ageRadios = document.getElementsByName('age');
    const repParentsCheckbox = document.getElementById('rep_gossip_parents');
    const repCharacterCheckbox = document.getElementById('rep_gossip_character');
    const repGeneralCheckbox = document.getElementById('rep_gossip_general');

    const calculateButton = document.getElementById('calculate-button');

    const resultDisplayDiv = document.getElementById('result-display');
    const resultTextP = document.getElementById('result-text');
    const errorMessageDiv = document.getElementById('error-message');

    const priceFactors = {
        basePrice: 100,
        education: {
            undergraduate: 1.5, college: 1.2, high_school: 1.05, middle_school: 0.9, blank: 1.0
        },
        networth: {
            high: 2.0, medium: 1.5, low: 1.2, blank: 1.0
        },
        caste: {
            brahmin: 100, kshatriya: 50, vaishya: 20, shudra: 10, varna: -50, blank: 0
        },
        skills: {
            musical: 10, cook: 20, easygoing: 15, sings: 10
        },
        age: {
            '18-23': 1.5, '24-27': 1.2, '28+': 0.95, blank: 1.0
        },
        reputation: {
            parentsCoeff: 0.85,
            characterCoeff: 0.9,
            generalSubtract: -20
        }
    };

    if (calculateButton) {
        calculateButton.addEventListener('click', calculateAndShowPrice);
    }

    function calculateAndShowPrice() {

        resultDisplayDiv.style.display = 'none';
        errorMessageDiv.style.display = 'none';
        resultTextP.textContent = '';

        const selectedEducation = educationSelect.value;
        const selectedNetworth = networthSelect.value;
        const selectedCaste = casteSelect.value;

        let selectedAge = 'blank';
        for (const radio of ageRadios) {
            if (radio.checked) {
                selectedAge = radio.value;
                break;
            }
        }

        const hasSkillMusical = skillMusicalCheckbox.checked;
        const hasSkillCook = skillCookCheckbox.checked;
        const hasSkillEasygoing = skillEasygoingCheckbox.checked;
        const hasSkillSings = skillSingsCheckbox.checked;

        const hasRepParents = repParentsCheckbox.checked;
        const hasRepCharacter = repCharacterCheckbox.checked;
        const hasRepGeneral = repGeneralCheckbox.checked;

        let isInputValid = true;
        if (selectedEducation === 'blank' || selectedNetworth === 'blank' || selectedCaste === 'blank' || selectedAge === 'blank') {
            isInputValid = false;
            errorMessageDiv.textContent = "Please select at least one option from each";
            errorMessageDiv.style.display = 'block';
        }

        if (isInputValid) {
            let calculatedPrice = priceFactors.basePrice;

            calculatedPrice *= priceFactors.education[selectedEducation];
            calculatedPrice *= priceFactors.networth[selectedNetworth];
            calculatedPrice *= priceFactors.age[selectedAge];

            if (hasRepParents) {
                calculatedPrice *= priceFactors.reputation.parentsCoeff;
            }
            if (hasRepCharacter) {
                calculatedPrice *= priceFactors.reputation.characterCoeff;
            }

            calculatedPrice += priceFactors.caste[selectedCaste];

            if (hasSkillMusical) {
                calculatedPrice += priceFactors.skills.musical;
            }
            if (hasSkillCook) {
                calculatedPrice += priceFactors.skills.cook;
            }
            if (hasSkillEasygoing) {
                calculatedPrice += priceFactors.skills.easygoing;
            }
            if (hasSkillSings) {
                calculatedPrice += priceFactors.skills.sings;
            }
            if (hasRepGeneral) {
                calculatedPrice += priceFactors.reputation.generalSubtract;
            }
            if (calculatedPrice < 0) {
                calculatedPrice = 0;
            }
            const formattedPrice = calculatedPrice.toFixed(2);
            resultTextP.textContent = `$${formattedPrice}`;
            resultTextP.classList.add('price-emphasis');
            resultDisplayDiv.style.display = 'block';
        }
    }
});
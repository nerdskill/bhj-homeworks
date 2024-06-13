document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');

    const loadPoll = async () => {
        try {
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const pollData = await response.json();
            renderPoll(pollData);
        } catch (error) {
            console.error('Error loading poll:', error);
        }
    };

    const renderPoll = (pollData) => {
        pollTitle.textContent = pollData.data.title;
        pollAnswers.innerHTML = '';

        pollData.data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answer;
            button.addEventListener('click', async () => {
                await vote(pollData.id, index);
                alert('Спасибо, ваш голос засчитан!');
            });
            pollAnswers.appendChild(button);
        });
    };

    const vote = async (pollId, answerIndex) => {
        try {
            const formData = `vote=${pollId}&answer=${answerIndex}`;
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    loadPoll();
});

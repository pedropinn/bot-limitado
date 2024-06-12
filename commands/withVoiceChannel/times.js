const { ApplicationCommandType, ChannelType } = require('discord.js');

module.exports = {
    name: 'times',
    description: 'Divide em dois times',
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        try {
            let voiceChannels = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
            let memberNames = [];

            voiceChannels.forEach(channel => {
                channel.members.forEach(member => {
                    memberNames.push(member.displayName || member.user.username);
                });
            });

            shuffleArray(memberNames);

            let middleIndex = Math.ceil(memberNames.length / 2);
            let firstHalf = memberNames.slice(0, middleIndex);
            let secondHalf = memberNames.slice(middleIndex);

            await interaction.reply(`Time Masculino:\n${firstHalf}\n\nTime Feminino:\n${secondHalf}`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Ocorreu um erro ao tentar listar os membros nos canais de voz.");
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

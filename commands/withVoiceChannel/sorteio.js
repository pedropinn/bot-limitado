const { ApplicationCommandType, ChannelType } = require('discord.js');

module.exports = {
    name: 'sorteio',
    description: 'Escolhe um para ficar de fora',
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
            let random = Math.floor(Math.random() * memberNames.length);

            await interaction.reply(`O escolhido para ficar de spectador é o: \n${memberNames[random]}`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Ocorreu um erro ao tentar listar os membros nos canais de voz.");
        }
    }
}

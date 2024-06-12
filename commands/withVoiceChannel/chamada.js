const { ApplicationCommandType, ChannelType } = require('discord.js');

module.exports = {
    name: 'chamada',
    description: 'lista de presença',
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

            let memberNamesString = memberNames.join(", ");
            await interaction.reply(`lista de presença: \n${memberNamesString}\n`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Ocorreu um erro ao tentar listar os membros nos canais de voz.");
        }
    }
}

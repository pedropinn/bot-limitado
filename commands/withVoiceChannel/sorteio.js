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

            let choosedMembers = [];
            const member = chooseRandomMember(memberNames, choosedMembers);

            await interaction.reply(`O escolhido para ficar de expectador é o: \n${member}`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Ocorreu um erro ao tentar listar os membros nos canais de voz.");
        }

        function chooseRandomMember(memberNames, choosedMembers) {
            let randomIndex = Math.floor(Math.random() * memberNames.length);
            let randomMember = memberNames[randomIndex];

            if (memberNames.length == choosedMembers.length) {
                choosedMembers = [];
            }

            if (choosedMembers.includes(randomMember)) {
                return chooseRandomMember(memberNames, choosedMembers);
            }
            choosedMembers.push(randomMember);
            return randomMember;
        }
    }
}

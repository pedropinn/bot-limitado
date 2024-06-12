const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'clean',
    description: 'Comando para limpar mensagens do chat',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Quantidade de msgs a ser apagada',
            type: ApplicationCommandOptionType.Integer,
            required: false,
        }
    ],
    
    run: async (client, interaction) => {
        try {
            let qtd = interaction.options.getInteger("quantidade");
            let embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("Provas apagadas com sucesso!");

            let embed_err = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Erro ao apagar as mensagens!");

            interaction.channel.bulkDelete(qtd)
                .then(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
                .catch((err) => {
                    console.log(err);
                    if (err.code) {
                        interaction.reply({ embeds: [embed_err], ephemeral: true });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
};

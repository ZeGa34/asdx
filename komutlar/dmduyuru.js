const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.guild) {
        const ozelmesajuyari = new Discord.MessageEmbed()
        .setColor(0x2488E7)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField('Bu komutu kullanmaya yetkin yok.');
        return message.author.send({ embeds: [ozelmesajuyari] }); 
    }

    let mesaj = args.slice(0).join('');
    if (mesaj.length < 1) return message.channel.send('Bir şey yazmalısınız.');

    message.delete();

    console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);
    const mesajat = new Discord.RichEmbed()
    .setColor('blue')
    .setDescription(`${mesaj}`);

    client.users.forEach(u => {
       if (u.bot ==   true) return;
      
        u.send(mesajat).catch(e => {}); // Kullanıcıya DM gönderirken hata olursa konsola yazdır
    });

    message.channel.send(`:white_check_mark: Mesaj başarıyla ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya gönderildi. ~@skylesdll uğradı:)`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyur'],
    permLevel: 4
};

exports.help = {
    name: 'duyuru',
    description: 'İstediğiniz şeyi DM yoluyla iletir.',
    usage: 'duyuru [duyurmak istediğiniz şey]'
};

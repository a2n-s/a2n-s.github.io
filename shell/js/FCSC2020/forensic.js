"use strict";

/**
 * Configs
 */
var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: "Below there's a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",
        ls_help: "List information about the files and folders (the current directory by default).",
        cat_help: "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: "Print the user name associated with the current effective user ID and more info.",
        date_help: "Print the system date and time.",
        help_help: "Print this menu.",
        clear_help: "Clear the terminal screen.",
        reboot_help: "Reboot the system.",
        graphic_help: "Displays the site in a more graphic way.",
        cd_help: "Change the current working directory.",
        mv_help: "Move (rename) files.",
        rm_help: "Remove files or directories.",
        rmdir_help: "Remove directory, this command will only work if the folders are empty.",
        touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: "Execute a command as the superuser.",
        welcome: "FCSC - 2020 - Forensic\n",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this sound bad for this website and your security.",
        welcome_file_name: "welcome_message.txt",
        invalid_command_message: "<value>: command not found.",
        reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: "Unable to '<value>', permission denied.",
        sudo_message: "Unable to sudo using a web client.",
        usage: "Usage",
        file: "file",
        folder: "folder",
        folder_not_found: "'<value>': not such directory.",
        file_not_found: "File '<value>' not found.",
        username: "Username",
        hostname: "Host",
        platform: "Platform",
        accesible_cores: "Accessible cores",
        language: "Language",
        value_token: "<value>",
        host: "wortyClient",
        user: "guest",
        is_root: false,
        type_delay: 5
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Your files here
 */
var files = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        "Rentrée": `
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Prompt:
        Bienvenue à l'académie de l'investigation numérique ! Votre mission, valider un maximum d'étapes de cette série afin de démontrer votre dextérité en analyse mémoire GNU/Linux.
        Première étape : retrouvez le HOSTNAME, le nom de l'utilisateur authentifié lors du dump et la version de Linux sur lequel le dump a été fait.
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        We download the memory dump, and we start to analyze it.
        Let's make this challenge with strings and grep, because the statement give us a lot of informations :

        strings dmp.mem | grep -i "USER"
        USER=Lesage

        Okay good we recover the username, which is Lesage.
        Let's recover the other informations with this techniques :

        strings dmp.mem | grep -i 'version'
        5.4.0-4-amd64 (debian-kernel@lists.debian.org)

        strings dmp.mem | grep -i 'hostname' -C20
        challenge.fcsc

        Nice ! We got our first forensic flag :
        FCSC{challenge.fcsc:Lesage:5.4.0-4-amd64} 
        `,
        "Porte":`
        -------------------------------------------------------------------------------------------------------------------------------
        Prompt:
        Un poste distant est connecté au poste en cours d'analyse via une porte dérobée avec la capacité d'exécuter des commandes.
        Quel est le numéro de port à l'écoute de cette connexion ?
        Quelle est l'adresse IP distante connectée au moment du dump ?
        Quel est l'horodatage de la création du processus en UTC de cette porte dérobée ?
        -------------------------------------------------------------------------------------------------------------------------------

        There will be an intermediate step, because, we need volatility for the next challenges.
        But, the kernel version is exotic, and volatility can't determine a profile on our dump.
        So we need to create our own volatility profile to allow us to examine the dump.
        But remember, we have the kernel version, and after a quick analysis, I know that the debian running behind it is a test version of Bullseye. So let's find an ISO to match it!


        Find it ! : https://cdimage.debian.org/cdimage/bullseye_di_alpha2/amd64/iso-cd/


        After installing the VM, I created my volatility profile by following the fortuna tutorial.
        Great, we have our profile for the next challenges, so let's start analyzing the memory dump.
        We know that a reverse shell is usually with netcat, so let's look in the dump what can match with that : 

        
        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_pslist | grep nc
        Volatility Foundation Volatility Framework 2.6
        0xffff9d72c014be00 ncat                 1515            1513            1001            1001   0x000000003e3d0000 2020-03-26 23:24:20 UTC+0000
        0xffff9d7284928000 ncat                 119711          119707          1001            1001   0x0000000007a54000 2020-03-26 23:36:52 UTC+0000


        We have two PIDs, one of which is very interesting, number 1515, so let's base ourselves on that for our future analyses and find the elements we're looking for.
        So we potentially have the time the order was launched: 2020-03-26 23:24:20.
        Let's use the netstat command, filtering with note previous result, to find the information :


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_netstat | grep nc
        TCP      fd:6663:7363:1000:c10b:6374:25f:dc37:36280 fd:6663:7363:1000:55cf:b9c6:f41d:cc24:58014 ESTABLISHED                  ncat/1515
        TCP      ::              :36280 ::              :    0 LISTEN                       ncat/119711
        TCP      0.0.0.0         :36280 0.0.0.0         :    0 LISTEN                       ncat/11971


        Knowing that the PID number is 1515, we retrieve the two pieces of information we are interested in, and we have our flag:
        FCSC{36280:fd:6663:7363:1000:55cf:b9c6:f41d:cc24:2020-03-26 23:24:20} 
        `,
        "Redaction":`
        -------------------------------------------------------------------------------------------------------------------------------
        Prompt:
        Le document note.docx vient d'être créé avec LibreOffice et enregistré avant le dump de la mémoire. Retrouvez son contenu !
        -------------------------------------------------------------------------------------------------------------------------------

        First, let's retrieve the PID from the LibreOffice process, filtering with .docx, to refine our research: 


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_lsof | grep .docx
        0xffff9d72848edd00 soffice.bin                      119615       19 /home/Lesage/Documents/temp/rapport-prez.docx
        0xffff9d72848edd00 soffice.bin                      119615       40 /home/Lesage/Documents/note.docx


        So, the PID we're going to focus on is PID 119615.
        With a little analysis, I realize that the path to the note.docx file is mapped in memory, but not its contents. So we'll have to look somewhere else.
        So I'm going to dump everything related to the LibreOffice PID: 


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_proc_maps -p 119615
        0xffff9d72848edd00   119615 soffice.bin          0x000056361a414000 0x000056361a415000 r--                0x2000      8      1     666351 /usr/lib/libreoffice/program/soffice.bin
        0xffff9d72848edd00   119615 soffice.bin          0x000056361a415000 0x000056361a416000 rw-                0x3000      8      1     666351 /usr/lib/libreoffice/program/soffice.bin
        0xffff9d72848edd00   119615 soffice.bin          0x000056361c0cb000 0x0000563623f25000 rw-                   0x0      0      0          0 [heap]


        In this kind of dump, you have to look at the pile, as well as the stack. So let's dump the contents of the stack, in which we should normally find the contents of the note.docx file :

        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_dump_map -p 119615 -s 0x000056361c0cb000 --dump-dir dump/

        I'll spare you the research work, but in the middle of the document, we find the contents of note.docx, so we have our flag:
        FCSC{PQHJRTSFYH-3467024-LSHRFLDFGA} 
        `,
        "Administration":`
        --------------------------------------------------------------------------------------------------------------------------------------
        Prompt:
        Ce poste administre un serveur distant avec le protocole SSH à l'aide d'une authentification par clé (clé protégée par mot de passe).
        La clé publique a été utilisée pour chiffrer le message ci-joint (flag.txt.enc).
        Retrouvez et reconstituez la clé en mémoire qui permettra de déchiffrer ce message.
        --------------------------------------------------------------------------------------------------------------------------------------

        First of all, I tried to retrieve the key from memory, but, by hand, it would have taken a very long time. So I used a tool foundeds on git to do it for me, nammed rsakeyfind. 


        ./rsakeyfind ../../dmp.mem
        d = 12460793603648154172634576294324764356921851601543376249263971385355308664001474224072254667082530432608492326239491878557534268321073641012723370224568362486847791322959696503229217995375933460744071182449104318476534793448468002100858570014170698345588600649409245649408999743821342293382425828500964969230457875702866061208039614953232618242245516551805487351387027773141972856162319523928419780405972969066802476877491166892646959172911316485769848621265023891332664138536799344975526764381672350159251366511979950064130731366992390823381013182186815338822199229913107286819591289270388870750262162515570617343809
        n = 27156259324364494546819374388173785636458745291644993656824052031192832665358626503824931967165063745738985155119632190909321739257721575254417781138851315918480436949082522936024649499965168635833472768161976247672142217286254570819498806298839620160775476215759967149684677314805111395364593027482965588868928996365215081601336731466193713741949208719563914532447046849652165136410573886954569273298157849675625380629094578684611548488935568178937156287424712755109581855128863319366210889843193945634323967939306175015830804489787158898856492500262280275347410451775447871929463819519225112797600024987362493494547


        After that I found another tool on git that allows to recreate a private key from n and d, called rsatool.
        So, let's rebuild our private key and then decrypt the file ! 


        -----BEGIN RSA PRIVATE KEY-----
        MIIEpQIBAAKCAQEA1x53goySMedpAqLVXHjeogyP/ihZMd9AnGBhBrkvYkCAdstnSrVZVmkXB/r5
        TL1sN3pGfXCnZyKzTXqUw7pLfEupMny3OJVFZKQFqJ8SfE7GyC1ABjD0YKaRu5vKBHkRE3XwrtNR
        icV0uao/toPkeGvN+VxMhepSO1GT/BRrM10wcPpQGxs4gRON96UMwI75Y1IYTqn5+FxdzXoN1I57
        7pF7rX20ktWrFjsKis6O3kcaFwGGe6uZ8UsMOg2CR8GRjLsuIp5JY24Cwck6m6UiGweV1hACUP39
        0Zu+q8LAdNfsAPsRcct63IF5n4ZoRmOCTbfx5hZvQmP0lKDKM8x1EwIDAQABAoIBAGK1YDFPP2YW
        wWCsRyr/a2kASrJc4VC5GHSo5Nyo7M0wu8HG48asICo+XosS5oIICTgLq3yzzJzOl2fd75VATpLi
        ROkdwRT9qbHccZxGIb1YiG4iFVbB7+DJjeWAPtp+kw9S9vXBkZCeQklPjZy6OIPpM8JQT+zC8Ki3
        biglVmtiZ/4I8Vblbw6Z8eWVe+/rCiySl1cjMzYH3fuu8bHYM7eWcUI2xaSpGUsbUkxQaZHwDvqA
        N0u10C+3RA3U+DmNq3FnWQWIPetISDOITv74JxvWVWBeSLdtmqg3+XreG81dGjDU6Z5bPBX4nB/a
        0YZIVc6D7o5Rx94yEkd9Rrg130ECgYEA5Eyu3hb9n4NVW4RKzxzxN5Wtyil/LW4ygaQrJhSWHUAF
        7AyvPyxvLOi/He7Qs+98W56ITyqLDkq9t4z6EA472mitQSvklvp/gFJfB58OO16WRRoTK5TOHwdp
        hTX8aWNb+Pg/zp1AHnyt+57O4AH471ld3AB5q4o/gKJ2MpSp6mUCgYEA8ThgkA0MLj005ZDqIUMf
        aGMWeyWN3oIrUvij/Q855+leMnUVfdDJzgbl+6nLIuXbSQny5relp3UukS0rXfFIYUVD1738EXO1
        EZ+yGDpvNqfC0xhN8MUfcIybxR2VqFqejLFLaiqEdizYT0ewgYQCRfCF+AxtpwxNLLJbgXD9bhcC
        gYEAjQfF+pJPSMvT3f4CTKF/bav8OOeblc/+SVHGCfcrqJQVVHWdiLQFVcPN1ErkCFPICb0MTYNl
        dYW8XvgqveJdHRYO+TSJOK80NmwsIkQigZBz2eo6r3B0SHzGtbDc5amodku89wDzTCIPRGIdQApX
        4lvdfHuardpwUiGKTMLDmHUCgYEA7SRcoiGBoQ+hKjMOSccAYJJRbp2b3G0iBH7WURmf9uORLI+4
        oikZzEcx3/ir8NICg8qZFsLiwz9LmYPLh56GZsI+kSGAZvPWxc22u2TvIs9IlFjnftV8NBy3otCT
        6Z+1EWHXXzcPZFJwEXjMCHfr+DAetJ4bSseoM1Hg7d9T9t8CgYEAhtlM7mVhwRmp1XSb1cr2gysG
        tCD+RSno4/rhTyiOYy90wzpcmvWeDg3F/qBMAM57pBkXWa8TOgOPVPVgOS7ZBrN81pAGQXfzk+F6
        AUHBj/5MiDnb3nGeWNFJUICyWk9pi7j+Y9RCPTdhqEz/tplM9FHgRKppeT+BpGE9JukEUmQ=
        -----END RSA PRIVATE KEY-----


        So he's recreating our private key! So let's use openssl to decrypt the flag.txt.enc : 


        openssl rsautl -decrypt -inkey key.pem -in flag.txt.enc -out flag.txt


        We finally got our flag : FCSC{ac5cad66114d4866a4b55e43cb8896cc4947855241b5af8d2f8a123c36083d98} 
        `,
        "Artefacts":`
        --------------------------------------------------------------------------------------------
        Prompt:
        Pour avancer dans l'analyse, vous devez retrouver :
        Le nom de processus ayant le PID 1254.
        La commande exacte qui a été exécutée le 2020-03-26 23:29:19 UTC.
        Le nombre d'IP-DST unique en communications TCP établies (état ESTABLISHED) lors du dump.
        --------------------------------------------------------------------------------------------

        First of all, let's dump the process with number 1254: 


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_netscan | grep ESTABLISHED
        9d72830a8000 TCP      10.42.42.131    :58772 185.199.111.154 :  443 ESTABLISHED
        9d72830a88c0 TCP      10.42.42.131    :45652 35.190.72.21    :  443 ESTABLISHED
        9d72830a9a40 TCP      10.42.42.131    :53190 104.124.192.89  :  443 ESTABLISHED
        9d72830abd40 TCP      10.42.42.131    :55226 151.101.121.140 :  443 ESTABLISHED
        9d72830ad780 TCP      10.42.42.131    :50612 104.93.255.199  :  443 ESTABLISHED
        9d72830af1c0 TCP      10.42.42.131    :38184 216.58.213.142  :  443 ESTABLISHED
        9d7284eba300 TCP      10.42.42.131    :37252 163.172.182.147 :  443 ESTABLISHED
        9d7284fe9180 TCP      127.0.0.1       :38498 127.0.0.1       :34243 ESTABLISHED
        9d7284fe9a40 TCP      10.42.42.131    :57000 10.42.42.134    :   22 ESTABLISHED
        9d7284feb480 TCP      10.42.42.131    :51858 10.42.42.128    :  445 ESTABLISHED
        9d7284fef1c0 TCP      10.42.42.131    :55224 151.101.121.140 :  443 ESTABLISHED
        9d7293778000 TCP      10.42.42.131    :47100 216.58.206.226  :  443 ESTABLISHED
        9d729377cec0 TCP      10.42.42.131    :47106 216.58.206.226  :  443 ESTABLISHED
        9d72c0acb480 TCP      10.42.42.131    :36970 116.203.52.118  :  443 ESTABLISHED
        9d72c1503d40 TCP      127.0.0.1       :34243 127.0.0.1       :38498 ESTABLISHED
        9d72c1bc1280 TCP      fd:6663:7363:1000:c10b:6374:25f:dc37:36280 fd:6663:7363:1000:55cf:b9c6:f41d:cc24:58014 ESTABLISHED
        9d72c23fcec0 TCP      10.42.42.131    :38186 216.58.213.142  :  443 ESTABLISHED
        9d72c23fe040 TCP      10.42.42.131    :47104 216.58.206.226  :  443 ESTABLISHED
        9d72c23fe900 TCP      10.42.42.131    :47102 216.58.206.226  :  443 ESTABLISHED


        We have to count the number of different connections, i.e. if the connection IP address repeats itself, it is not counted twice.
        So we have 13 established connections.
        Now, let's retrieve the command that was executed at the announced date and time :


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_bash | grep "2020-03-26 23:29:19 UTC"
        1523 bash                 2020-03-26 23:29:19 UTC+0000   nmap -sS -sV 10.42.42.0/24


        So, the command is nmap -sS -sV 10.42.42.0/24, let's now find the name of the PID with number 1254:


        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_psscan | grep 1254
        0x000000003fdccd80 pool-xfconfd      1254      -      -1     -1     0x0fd08ee88ee08ec0


        Great ! We have our flag : FCSC{pool-xfconfd:nmap -sS -sV 10.42.42.0/24:13} 
        `,
        "Nuages":`
        --------------------------------------------------------------------------------------------
        Prompt:
        Le poste en cours d'analyse est connecté à un serveur web à l'adresse 10.42.42.132. 
        Le serveur web est protégé par une authentification.
        Retrouvez le nom d'utilisateur et le mot de passe de cette connexion.
        --------------------------------------------------------------------------------------------

        First of all, I'm not going to detail all the avenues I've explored to solve this challenge. I'm only going to show the right steps to solving it.
        If you want the complete research process, contact me via my Twitter.

        Given the difficulty of the challenge, you shouldn't try to flag in a too "random" way, so I'm thinking about a way that could certify me the location of the password, as well as the username in the memory.
        So I decide to put down a sheet of paper, to see the elements I've gathered, and that could help me to solve this challenge.
        So I come to the conclusion that, to be sure of the location of the password in the memory, I must have a second dump that faithfully reproduces the identification in the dump.
        So we're going to make our own dump! Remember at the beginning, with my research for the other challenges, I had observed two things:
        - There is a nginx server
        - Authentication is basic auth on /panel
        So we're going to set this up in the virtual machine:


        location /panel{
            try_files $uri $uri/ =404;
            auth_basic "Restriced Content"
            auth_basic_user_file /etc/nginx/.htpasswd;
        }


        We add this line in the nginx configuration. I chose as username and password very identifiable words, to recognize them directly in the dump :
        - Username: JESUISUNUSERNAME
        - Password: C3C1ESTUNPASSWORD

        Perfect, we have faithfully reproduced the authentication used in the dump!
        We will now do a memory dump, thanks to LiMe. I won't describe here how to do it, it's very well explained on the github that hosts the project.

        Be careful, I didn't specify it, but you have to use the chromium browser, as in the challenge dump, for the comparison of the two to be efficient.
        Once I've recovered my second dump, there are several hypotheses:
        - "The difference" between the password and the username is the same, no matter how chromium is used.
        - Dump all chromium processes from my own dump, identify where the username and password are, and do the same in the challenge dump.
        Here's a problem: I have two potential usernames, and I may be missing some.


        So I decide to focus on the username in the chall's dump, to be 100% sure and refine my next searches on the password.
        I dump all the chromium processes in my dump, and I observe that my username is not present in it, which seems very strange to me, given the very recognizable value it has.
        So I check on the internet, and, on a stack overflow forum, a person advises to look at the strings of the file in UTF-16, and not in UTF-8, which results in the -el option of the strings command.
        So I do this on my dump, and miraculously, my username and password appear!
        So I assume that it must be the same on the challenge dump. So I will string the challenge dump with this option, to see if other username appear:


        strings -el dmp.mem | grep -i "Admin3"
        Admin3
        Admin3
        Admin3Kz7


        (Aside)
        Throughout my research, I kept in mind that the flag was case sensitive, so I had a big doubt that Admin3 was the username. (but that was just a guess).
        (End of the aside)

        A very interesting username comes up: Admin3Kz7. So I decide to add it to my list of potential username, which becomes :
        - Admin3
        - Admin3Kz7
        Now, to check 100% of the username, I will dump the chromium processes of the challenge one by one, and check if I find "Admin3" or "Admin3Kz7" in it.
        After one hour, I filtered them all, by doing the command : strings -el * | grep -i "Admin3" on it, and only one came back with a result :


        0xffff9d72bd57cd80 chromium     119187  119180  1001  1001
        
        
        When you extract everything related to it with the command:
        volatility --profile=Linuxdebian-5-4-0-4-amd64x64 -f dmp.mem linux_dump_map -p 119187 --dump-dir dump/
        
        It can be seen that this process contains : Admin3Kz7.
        So I am now 100% sure that the username is Admin3Kz7, and that the password is in the dump of process 119187.
        Indeed, if I compare with my own dump, the username and the password are in the same dump of the chromium process, we can easily reach the conclusion I drew above.
        Moreover, in my dump, I noticed that the username and the password were "next to each other", I know that this notion is very abstract in forensic, but it was my last lead.
        In my dump, we can see that the username and the password are 7 strings apart:


        CECIESTUNUSERNAME
        Jqqq
        RRHVJJ?
        jj, '*GL
        (8%*
        WdQRX
        viii
        6363
        C3C1ESTUNPASSWORD


        I therefore deduce that in the challenge dump, and more particularly in the dump of the chromium process, it must be almost identical:


        Admin3Kz7
        yyns
        =fr/>
        4}""
        nT80
        5sdtYh68
        pi""
        DPCH


        Here, the only interesting string that strongly resembles a password is: "5sdtYh68".
        I also kept in mind that the flag was case sensitive, so I came to the conclusion that the credentials used for the connection were right in front of me.
        Indeed, we have a pretty self-explanatory username, and a string that looks like a password.
        Moreover, the connection between the two dumps is quite strong, and doesn't leave too much room for randomness, except for the location of the string, but randomness was not very important.
        So I decide to try this, and it's correct! The password was right: 5sdtYh68!
        So we have our flag:
        
        FCSC{Admin3Kz7:5sdtYh68} ! 
        `
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Directories here
 */
var folders = (function () {
    var instance;
    var SingletonFolders = function (options){
        var options = options || SingletonFolders.defaultOptions;
        for(var key in SingletonFolders.defaultOptions){
            this[key] = options[key] || SingletonFolders.defaultOptions[key];
        }
    };
    SingletonFolders.defaultOptions = {
        "/": "../index.html",
        "..": "../fcsc2020.html"
    };
    return{
        getInstance: function(options){
            instance == void 0 && (instance = new SingletonFolders(options));
            return instance;
        }
    };
})();
var main = (function () {

    /**
     * Aux functions
     */
    var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    var ignoreEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    
    var scrollToBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    
    var isURL = function (str) {
        return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
    };
    
    /**
     * Model
     */
    var InvalidArgumentException = function (message) {
        this.message = message;
        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    // Extends Error
    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;

    var cmds = {
        LS: { value: "ls", help: configs.getInstance().ls_help },
        CAT: { value: "cat", help: configs.getInstance().cat_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        DATE: { value: "date", help: configs.getInstance().date_help },
        HELP: { value: "help", help: configs.getInstance().help_help },
        CLEAR: { value: "clear", help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        CD: { value: "cd", help: configs.getInstance().cd_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
        TOUCH: { value: "touch", help: configs.getInstance().touch_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help },
        GRAPHIC : { value: "graphic", help: configs.getInstance().graphic_help}
    };

    var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
        }
        if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
            throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
        }
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~/writeups/fcsc2020/forensic/" + (root ? "#" : "$"));
        this.profilePic = profilePic;
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.sidenav = sidenav;
        this.sidenavOpen = false;
        this.sidenavElements = [];
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.sidenav.addEventListener("click", ignoreEvent);
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
        this.prepareSideNav();
        this.lock(); // Need to lock here since the sidenav elements were just added
        document.body.addEventListener("click", function (event) {
            if (this.sidenavOpen) {
                this.handleSidenav(event);
            }
            this.focus();
        }.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
    };

    Terminal.prototype.prepareSideNav = function () {
        var capFirst = (function () {
            return function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })();
        for (var file in files.getInstance()) {
            var element = document.createElement("button");
            Terminal.makeElementDisappear(element);
            element.onclick = function (file, event) {
                this.handleSidenav(event);
                this.cmdLine.value = "cat " + file + " ";
                this.handleCmd();
            }.bind(this, file);
            element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
            this.sidenav.appendChild(element);
            this.sidenavElements.push(element);
        }
        // Shouldn't use document.getElementById but Terminal is already using loads of params
        document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
    };

    Terminal.prototype.handleSidenav = function (event) {
        if (this.sidenavOpen) {
            this.profilePic.style.opacity = 0;
            this.sidenavElements.forEach(Terminal.makeElementDisappear);
            this.sidenav.style.width = "50px";
            document.getElementById("sidenavBtn").innerHTML = "&#9776;";
            this.sidenavOpen = false;
        } else {
            this.sidenav.style.width = "300px";
            this.sidenavElements.forEach(Terminal.makeElementAppear);
            document.getElementById("sidenavBtn").innerHTML = "&times;";
            this.profilePic.style.opacity = 1;
            this.sidenavOpen = true;
        }
        document.getElementById("sidenavBtn").blur();
        ignoreEvent(event);
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = false;
        });
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                for (var file in files.getInstance()) {
                    if (file.toLowerCase().startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }else if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CD.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CD.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                for (var folder in folders.getInstance()) {
                    if (folder.toLowerCase().startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CD.value + " " + folder);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.CAT.value:
                this.cat(cmdComponents);
                break;
            case cmds.LS.value:
                this.ls();
                break;
            case cmds.WHOAMI.value:
                this.whoami();
                break;
            case cmds.DATE.value:
                this.date();
                break;
            case cmds.HELP.value:
                this.help();
                break;
            case cmds.CLEAR.value:
                this.clear();
                break;
            case cmds.REBOOT.value:
                this.reboot();
                break;
            case cmds.CD.value:
                this.cd(cmdComponents);
                break;
            case cmds.MV.value:
            case cmds.RMDIR.value:
            case cmds.RM.value:
            case cmds.TOUCH.value:
                this.permissionDenied(cmdComponents);
                break;
            case cmds.SUDO.value:
                this.sudo();
                break;
            case cmds.GRAPHIC.value:
                this.graphic();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    Terminal.prototype.cd = function (cmdComponents) {
        var result;
        if(cmdComponents.length <= 1 || cmdComponents.length > 2){
            result = configs.getInstance().usage + ": " + cmds.CD.value + " <"+ configs.getInstance().folder + ">";
            this.type(result, this.unlock.bind(this));
        }else if (!cmdComponents[1] || !folders.getInstance().hasOwnProperty(cmdComponents[1])){
            result = configs.getInstance().folder_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
            this.type(result, this.unlock.bind(this));
        }else{
            window.location.href = folders.getInstance()[cmdComponents[1]];
        }
    };

    Terminal.prototype.cat = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
        } else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name || !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
            result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
        } else {
            result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result ="";
        for(var folder in folders.getInstance()){
            result += "drwxr-xr-x "+folder+"\n";
        }
        for (var file in files.getInstance()) {
            result += "-rw-r--r-- "+file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
    };

    Terminal.prototype.help = function () {
        var result = configs.getInstance().general_help + "\n\n";
        for (var cmd in cmds) {
            result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.graphic = function(){
        document.location.href="/graphic.html";
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                document.getElementById("sidenav"),
                document.getElementById("profilePic"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;

'use strict';

const Level = require( './level' );

module.exports = [
    new Level(
        'Уровень #1: основы',

        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '       bbbbb      ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '         t        ' + '\n' +
        '                  ' + '\n' +
        '         p        ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ',

        '<p>Напиши программу которая заведёт танк на клетку с кружком.\
        В программе используй команду <span class="inline-code">forward</span>\
        которая передвигает танк вперёд на одну клетку.\
        После команды поставь скобки <span class="inline-code">()</span>\
        и точку с запятой <span class="inline-code">;</span>.\
        <p>Например:\
            <pre><code class="js">' +
                'forward();\n'+
            '</code></pre>\
        <p>Написав программу, нажми кнопку <span class="inline-code">Запуск</span>.',

        [
            { name: 'forward()', description: 'ехать вперёд' },
        ]
    ),

    new Level(
        'Уровень #2: повороты',

        'bbbbbbbbbbbbbbbbbb' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '       p          ' + '\n' +
        '         t        ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        'bbbbbbbbbbbbbbbbbb',

        '<p>Для поворота танка налево и направо используй команды\
        <span class="inline-code">left</span> и <span class="inline-code">right</span>.\
        <p>Обрати внимание, что ниже есть справочник, где перечислены все команды которые\
        можно использовать.',

        [
            { name: 'forward()', description: 'ехать вперёд' },
            { name: 'left()', description: 'повернуть налево' },
            { name: 'right()', description: 'повернуть направо' },
        ]
    ),

    new Level(
        'Уровень #3: зачем нужны скобки?',

        'bbbb          bbbb' + '\n' +
        'b                b' + '\n' +
        'b p              b' + '\n' +
        'b                b' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '        bb        ' + '\n' +
        '        bb        ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        'b                b' + '\n' +
        'b              t b' + '\n' +
        'b                b' + '\n' +
        'bbbb          bbbb',

        '<p>Ты помнишь что после каждой команды ставятся скобки? Это неспроста!\
        Между скобками можно записать число.\
        Например, вот так: <span class="inline-code">left(2)</span>.\
        Число <span class="inline-code">2</span> как бы говорит команде:\
        сделай поворот два раза, а не один, как было на прошлых уровнях.\
        То есть, вместо вот такого:\
            <pre><code class="js">' +
                'left();\n'+
                'left();\n'+
            '</code></pre>\
        можно написать так:\
            <pre><code class="js">' +
                'left(2);\n'+
            '</code></pre>\
        <p>Для команд <span class="inline-code">right</span> и <span class="inline-code">forward</span>\
        тоже можно написать в скобках число. И тогда танк будет поворачивать и ехать сколько раз,\
        сколько написано между скобок.\
        <p>В этом задании приведи танк на клетку с кружком четыремя командами.\
        Четырёх команд хватит – ведь теперь ты знаешь для чего после них ставятся скобки.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
        ]
    ),

    new Level(
        'Уровень #4: как это называется?',

        '  b            b  ' + '\n' +
        '  b     p      b  ' + '\n' +
        '  b            b  ' + '\n' +
        '  bbbbbb bbbbbbb  ' + '\n' +
        '     b     b      ' + '\n' +
        '     b     b      ' + '\n' +
        '                  ' + '\n' +
        '     b     b      ' + '\n' +
        '     b     b      ' + '\n' +
        '     bbbbbbb      ' + '\n' +
        '                  ' + '\n' +
        '                  ' + '\n' +
        '  bbbbbb bbbbbbb  ' + '\n' +
        '  b            b  ' + '\n' +
        '  b     t      b  ' + '\n' +
        '  b            b  ',

        '<p>Числа между скобок настоящие программисты называют параметрами. Или аргументами, кому как нравится.\
        Правда, тебе не обязательно это запоминать, но если запомнишь, то ты молодец!\
        <p>А вот тебе вопрос: как ты думаешь, сколько проедет танк, если написать <span class="inline-code">forward(1)</span>?\
        Да, он проедет одну клетку, ведь между скобками написано <span class="inline-code">1</span>.\
        А ты помнишь, что на первом и втором уровне ты не писал никаких чисел между скобками, и танк тоже ехал одну клетку?\
        И вот сейчас получается что команда <span class="inline-code">forward(1)</span>\
        ничем не отличается от команды <span class="inline-code">forward()</span>.\
        <p>Так получается потому что команда передвигает танк на одну клетку, и если между скобками числа нет,\
        то она больше ничего не делает. А если там <span class="inline-code">1</span>, то она видит,\
        что танк уже проехал одну клетку, и тоже больше ничего не делает.\
        <p>Наверное, ты уже понял что писать <span class="inline-code">1</span> между скобками не обязательно.\
        Кстати, такие "необязательные" числа программисты называют "числами по умолчанию".\
        Впрочем, это тоже не обязательно запоминать. А нужно запомнить только то, что для всех команд которые ты уже знаешь\
        единицу в скобках можно не писать если танку нужно проехать только одну клетку или повернуть только один раз.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
        ]
    ),

    new Level(
        'Уровень #5: препятствия',

        'bbbbbbbbbbbbbbbbbb' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b        t       b' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbb bb' + '\n' +
        'b                b' + '\n' +
        'bb bbbbbbbbbbbbbbb' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbb bb' + '\n' +
        'b                b' + '\n' +
        'b        p       b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbbbbb',

        '<p>На прошлом уровне ящики помешали проехать к кружку напрямую, и их пришлось объехать.\
        Но программа не должна была получиться очень длинной, если ты записывал число ходов между скобок для команды\
        <span class="inline-code">forward</span>\
        <p>Как ты помнишь, ниже есть справочник с командами.\
        В нём между скобкок у каждой команды написано <span class="inline-code">разы = 1</span>.\
        Это напоминание, что число между скобками – это <span class="inline-code">разы</span>,\
        то есть, сколько раз нужно повторить команду.\
        А если между скобок ничего не написать, то команда просто выполнится <span class="inline-code">1</span> раз.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
        ]
    ),

    new Level(
        'Уровень #6: выстрелы',

        'bbbbbbbbbbbbbbbbbb' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b        t       b' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbb bb' + '\n' +
        'b                b' + '\n' +
        'bb bbbbbbbbbbbbbbb' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbb bb' + '\n' +
        'b                b' + '\n' +
        'b        p       b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbbbbb',

        '<p>Танк умеет стрелять с помощью команды <span class="inline-code">fire</span>.\
        От выстрелов ящики разрушаются.\
        Oдной командой <span class="inline-code">fire</span> можно выстрелить несколько раз\
        если ей записать число между скобок.\
        <p>Наверное, ты легко догадаешься в какие ящики надо стрелять чтобы проложить короткий путь к кружку,\
        а значит, программа должна получиться намного короче чем в прошлый раз.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
            { name: 'fire( разы = 1 )', description: 'выстрелить' },
        ]
    ),

    new Level(
        'Уровень #7: насколько целей',

        'bbbbbbbbbbbbbbbbbb' + '\n' +
        'b                b' + '\n' +
        'b   t         t  b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b      sssss     b' + '\n' +
        'b      s   s     b' + '\n' +
        'b      s p       b' + '\n' +
        'b      s   s     b' + '\n' +
        'b      sssss     b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'b   t         t  b' + '\n' +
        'b                b' + '\n' +
        'b                b' + '\n' +
        'bbbbbbbbbbbbbbbbbb',

        '<p>В игре может быть несколько клеток с кружками, и танк должен побывать на каждой из них.\
        <p>Кстати, камни – не ящики, их нельзя разбить выстрелами.\
        <p>Написав программу, запомни её – это пригодится на следующем уровне.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
            { name: 'fire( разы = 1 )', description: 'выстрелить' },
        ]
    ),

    new Level(
        'Уровень #8: повторы',

        'ssssssssssssssssss' + '\n' +
        'sbbsssssssssssssss' + '\n' +
        'sbbssss   tsssssss' + '\n' +
        'sssssss ssssssssss' + '\n' +
        'sssssssbssssssssss' + '\n' +
        'sssssss ssssssssss' + '\n' +
        'ssss    ssssssssss' + '\n' +
        'ssss sssssssssssss' + '\n' +
        'ssssbsssssssssssss' + '\n' +
        'ssss sssssssssssss' + '\n' +
        's    sssssssssbbbs' + '\n' +
        's ssssssssssssbbbs' + '\n' +
        'sbssssssssssssbbbs' + '\n' +
        's ssssssssssssssss' + '\n' +
        ' p                ' + '\n' +
        '                  ',

        '<p>Кажется, программу на прошлом уровне было очень скучно писать.\
        Ведь сначала дважды нужно было написать <span class="inline-code">right()</span> и\
        <span class="inline-code">forward(5)</span>, а потом трижды \
        <span class="inline-code">right()</span> и <span class="inline-code">forward(10)</span>.\
        <p>Чтобы не писать одни и те же команды по многу раз, используют специальную инструкцию \
        для повтора – <span class="inline-code">loop() { }</span>.\
        Она похожа на обычную команду, и после неё пишутся скобки в которых надо написать\
        сколько будет повторов.\
        Но затем нужно ещё написать фигурные скобки <span class="inline-code">{ }</span>,\
        а между ними написать команды которые надо повторять.\
        <p>Непонятно? Тогда посмотри как можно было написать программу на прошлом уровне:\
              <pre><code class="js">' +
                'loop(2) {\n'+
                '    right();\n'+
                '    forward(5);\n'+
                '}\n'+
                'loop(3) {\n'+
                '    right();\n'+
                '    forward(10);\n'+
                '}\n'+
            '</code></pre>\
        <p>Итак, запомним: сначала пишем <span class="inline-code">loop() {</span>,\
        потом с новой строчки пишем команды которые повторяются, и наконец пишем <span class="inline-code">}</span>.\
        <p>А теперь попробуй пройти этот уровень с помощью одной инструкции <span class="inline-code">loop</span>\
        и пяти команд. Когда будешь писать программу, всё время посматривай на пример – у тебя должно получиться\
        похоже, только команд между фигурными скобками будет побольше. Если не получается, то перечитай всё с начала\
        обращая внимание на то где должна быть инструкция <span class="inline-code">loop</span>,\
        где фигурные скобки, и где команды.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
            { name: 'fire( разы = 1 )', description: 'выстрелить' },
            { name: 'loop( разы ) { }', description: 'повторить' },
        ]
    ),

    new Level(
        'Уровень #9: ещё о повторах',

        /*
        '         p        ' + '\n' +
        '            sssss ' + '\n' +
        '            b t s ' + '\n' +
        '  sssss     sssss ' + '\n' +
        '  b t s           ' + '\n' +
        '  sssss     sssss ' + '\n' +
        '            b t s ' + '\n' +
        '  sssss     sssss ' + '\n' +
        '  b t s           ' + '\n' +
        '  sssss     sssss ' + '\n' +
        '            b t s ' + '\n' +
        '  sssss     sssss ' + '\n' +
        '  b t s           ' + '\n' +
        '  sssss           ' + '\n' +
        '                  ' + '\n' +
        '                  ',
        */
        '          b       ' + '\n' +
        '          b       ' + '\n' +
        '          b       ' + '\n' +
        '          b       ' + '\n' +
        'bbbbbssssss sbbbbb' + '\n' +
        '     s    s s     ' + '\n' +
        '     sbss s s     ' + '\n' +
        '     s s  s s     ' + '\n' +
        '     s st s s     ' + '\n' +
        '     s ssssbs     ' + '\n' +
        '    ps b    s     ' + '\n' +
        'bbbbbssssssssbbbbb' + '\n' +
        '     b            ' + '\n' +
        '     b            ' + '\n' +
        '     b            ' + '\n' +
        '     b            ',

        '<p>Прекрасно, что тебе получись справиться с прошлым заданием!\
        А сейчас две заметки про повторы, которые просто полезно знать:\
        <p>Первая: программисты повторы называют циклами. Наверное, им так больше нравится.\
        <p>Вторая: если повторяется одна команда, то <span class="inline-code">loop</span>\
        писать совсем не обязательно, ведь можно просто написать число повторов у команды между скобками.\
        Посмотри: и такая программа:\
             <pre><code class="js">' +
                'forward(4);\n'+
            '</code></pre>\
        и такая\
              <pre><code class="js">' +
                'loop(4) {\n'+
                '    forward();\n'+
                '}\n'+
            '</code></pre>\
        и даже такая\
              <pre><code class="js">' +
                'loop(2) {\n'+
                '    forward(2);\n'+
                '}\n'+
            '</code></pre>\
        <p>делают одно и то же, но первая из них и проще и короче. А вот если есть несколько повторяющихся команд,\
        то инструкция <span class="inline-code">loop</span> будет очень полезна.\
        <p>Ну а сейчас выполни задание с танком используя три повтора,\
        чтобы программа получилась не очень длинной.',

        [
            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
            { name: 'left( разы = 1 )', description: 'повернуть налево' },
            { name: 'right( разы = 1 )', description: 'повернуть направо' },
            { name: 'fire( разы = 1 )', description: 'выстрелить' },
            { name: 'loop( разы ) { }', description: 'повторить' },
        ]
    ),
];
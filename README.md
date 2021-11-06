# wbTech
## Описание
Тестовое задание на стажировку в [WbTech](https://wbtech.ru/).

В проекте есть 2 ветки:
* master - основна ветка разработки
* gh-pages - ветка деплоя для Github pages (использовался плагин [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages)).

Проект собирается автоматически в папку `build` при изменении любого html, scss, js файла

## Github pages
Результат работы, можете посмотреть [здесь](https://xeniasv.github.io/wbTech/).

## Инструкции по запуску
* Склонируйте проект на локалькую машину с помощью комманды git clone https://github.com/XeniaSv/wbTech.git
* Установите [node.js](https://nodejs.org/en/)
* Выполните команду `npm install`
* Выполните команду `gulp`
* Откройте ссылку в браузере `localhost:3000`
* Для деплоя новой версии проекта используйте команду `gulp deploy` (смотрите более подробно в заметках)

## Заметки
* При запуске команды `gulp deploy` может вылететь ошибка `NullPointerExceptions`. Для этого замените содержимое файла `/node_modules/gulp-gh-pages/node_modules/gift/lib/commit.js` на:
``` js
(function() {
  var Actor, Commit, Tree, _;

  _ = require('underscore');

  Actor = require('./actor');

  Tree = require('./tree');

  module.exports = Commit = (function() {
    function Commit(_at_repo, _at_id, parents, tree, _at_author, _at_authored_date, _at_committer, _at_committed_date, _at_gpgsig, _at_message) {
      this.repo = _at_repo;
      this.id = _at_id;
      this.author = _at_author;
      this.authored_date = _at_authored_date;
      this.committer = _at_committer;
      this.committed_date = _at_committed_date;
      this.gpgsig = _at_gpgsig;
      this.message = _at_message;
      this.tree = _.memoize((function(_this) {
        return function() {
          return new Tree(_this.repo, tree);
        };
      })(this));
      this.parents = _.memoize((function(_this) {
        return function() {
          return _.map(parents, function(parent) {
            return new Commit(_this.repo, parent);
          });
        };
      })(this));
      this.describe = (function(_this) {
        return function(refs, first_parent, callback) {
          var options, parent, _ref, _ref1;
          if (!callback) {
            _ref = [callback, first_parent], first_parent = _ref[0], callback = _ref[1];
          }
          if (!callback) {
            _ref1 = [callback, refs], refs = _ref1[0], callback = _ref1[1];
          }
          options = {};
          if (refs === "all") {
            options.all = true;
          }
          if (refs === "tags") {
            options.tags = true;
          }
          if (!!first_parent) {
            options.first - (parent = true);
          }
          options.long = true;
          return _this.repo.git("describe", options, _this.id, function(err, stdout, stderr) {
            if (err) {
              return callback(err);
            }
            return callback(null, stdout.trim());
          });
        };
      })(this);
    }

    Commit.prototype.toJSON = function() {
      return {
        id: this.id,
        author: this.author,
        authored_date: this.authored_date,
        committer: this.committer,
        committed_date: this.committed_date,
        message: this.message
      };
    };

    Commit.find_all = function(repo, ref, options, callback) {
      options = _.extend({
        pretty: "raw"
      }, options);
      return repo.git("rev-list", options, ref, (function(_this) {
        return function(err, stdout, stderr) {
          if (err) {
            return callback(err);
          }
          return callback(null, _this.parse_commits(repo, stdout));
        };
      })(this));
    };

    Commit.find = function(repo, id, callback) {
      var options;
      options = {
        pretty: "raw",
        "max-count": 1
      };
      return repo.git("rev-list", options, id, (function(_this) {
        return function(err, stdout, stderr) {
          if (err) {
            return callback(err);
          }
          return callback(null, _this.parse_commits(repo, stdout)[0]);
        };
      })(this));
    };

    Commit.find_commits = function(repo, ids, callback) {
      var commits, next;
      commits = [];
      next = function(i) {
        var id;
        if (id = ids[i]) {
          return Commit.find(repo, id, function(err, commit) {
            if (err) {
              return callback(err);
            }
            commits.push(commit);
            return next(i + 1);
          });
        } else {
          return callback(null, commits);
        }
      };
      return next(0);
    };

    Commit.parse_commits = function(repo, text) {
      var author, author_line, authored_date, commits, committed_date, committer, committer_line, encoding, gpgsig, id, lines, message_lines, parents, tree, _ref, _ref1;
      commits = [];
      lines = text.split("\n");
      while (lines.length) {
        id = _.last(lines.shift().split(" "));
        if (!/^[a-f0-9]{40}$/.test(id)) {
          break;
        }
        tree = _.last(lines.shift().split(" "));
        parents = [];
        while (/^parent/.test(lines[0])) {
          parents.push(_.last(lines.shift().split(" ")));
        }
        author_line = lines.shift();
        _ref = this.actor(author_line), author = _ref[0], authored_date = _ref[1];
        committer_line = lines.shift();
        _ref1 = this.actor(committer_line), committer = _ref1[0], committed_date = _ref1[1];
        gpgsig = [];
        if (/^gpgsig/.test(lines[0])) {
          gpgsig.push(lines.shift().replace(/^gpgsig /, ''));
          while (!/^ -----END PGP SIGNATURE-----$/.test(lines[0])) {
            gpgsig.push(lines.shift());
          }
          gpgsig.push(lines.shift());
        }
        while (/^kilnhgcopies/.test(lines[0])) {
          lines.shift();
        }
        while (/^HG:/.test(lines[0])) {
          lines.shift();
        }
        if (/^encoding/.test(lines[0])) {
          encoding = _.last(lines.shift().split(" "));
        }
        if (lines.length) {
          lines.shift();
        }
        message_lines = [];
        while (/^ {4}/.test(lines[0])) {
          message_lines.push(lines.shift().slice(4));
        }
        while ((lines[0] != null) && !lines[0].length) {
          lines.shift();
        }
        commits.push(new Commit(repo, id, parents, tree, author, authored_date, committer, committed_date, gpgsig.join("\n"), message_lines.join("\n")));
      }
      return commits;
    };

    Commit.actor = function(line) {
      var actor, epoch, m, _ref;
      _ref = /^.+? (.*) (\d+) .*$/.exec(line), m = _ref[0], actor = _ref[1], epoch = _ref[2];
      return [Actor.from_string(actor), new Date(1000 * +epoch)];
    };

    return Commit;

  })();

}).call(this);
```
Данная проблема связана с тем, что в `gulp-gh-pages` используется старая версия библиотеки `gift`.
* После запуска команды `gulp deploy` страница в Github pages не всегда загружает png файлы. Выдается ошибка `Failed to load resource: the server responded with a status of 404 ()`. Данная проблема лечится путем пуша пустого коммита в ветку `gh-pages`.

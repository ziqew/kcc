require_relative '../../deployment'
require 'cdo/chat_client'
require 'cdo/rake_utils'

namespace :lint do
  desc 'Lints Ruby code with rubocop.'
  task :ruby do
    RakeUtils.bundle_exec 'rubocop'
  end

  desc 'Lints Haml code with haml-lint.'
  task :haml do
    RakeUtils.bundle_exec 'haml-lint dashboard pegasus'
  end

  desc 'Lints SCSS code with scss-lint.'
  task :scss do
    RakeUtils.bundle_exec 'scss-lint'
  end

  desc 'Lints JavaScript code.'
  task :javascript do
    Dir.chdir(apps_dir) do
      ChatClient.log 'Linting <b>apps</b> JavaScript...'
      RakeUtils.system 'npm run lint'
    end
    Dir.chdir(shared_js_dir) do
      ChatClient.log 'Linting <b>shared</b> JavaScript...'
      # Use vanilla eslint parser, because babel-eslint always allows es6
      RakeUtils.system '../../apps/node_modules/eslint/bin/eslint.js *.js'
    end
  end

  task all: [:ruby, :haml, :scss, :javascript]
end
desc 'Lints all code.'
task lint: ['lint:all']

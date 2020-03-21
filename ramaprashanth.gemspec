# frozen_string_literal: true

Gem::Specification.new do |s|
    s.name          = 'ramaprashanth'
    s.version       = '1.0.0'
    s.license       = 'MIT'
    s.authors       = ['Rama Prashanth']
    s.email         = ['rv@ramaprashanth.com']
    s.homepage      = 'https://github.com/ramaprashanth/ramaprashanth.github.io'
    s.summary       = 'Personal Blog and Portfolio jekyll theme'
  
    s.files         = `git ls-files -z`.split("\x0").select do |f|
      f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
    end
  
    s.platform = Gem::Platform::RUBY
    s.add_runtime_dependency 'jekyll', '~> 3.8'
    s.add_runtime_dependency 'jekyll-seo-tag', '~> 2.6'
    s.add_runtime_dependency 'jekyll-sitemap', '~> 1.4'
    s.add_runtime_dependency 'jekyll-gist', '~> 1.5'
    s.add_runtime_dependency 'jekyll-github-metadata', '~> 2.13'
    s.add_runtime_dependency 'jekyll-feed', '~> 0.13'
    s.add_runtime_dependency 'jemoji', '~> 0.11'
    s.add_runtime_dependency 'jekyll-paginate-v2', '~> 3.0'

  end
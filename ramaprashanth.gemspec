Gem::Specification.new do |spec|
    spec.name          = "ramaprashanth"
    spec.version       = "0.1"
    spec.authors       = ["Rama Prashanth"]
    spec.email         = ["rv@ramaprashanth.com"]
  
    spec.summary       = "Portfolio Blog Jekyll theme"
    spec.homepage      = "https://github.com/ramaprashanth/ramaprashanth.github.io"
    spec.license       = "MIT"
  
    spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }
  
    spec.add_runtime_dependency "jekyll", "~> 3.8"
  
    spec.add_runtime_dependency "jekyll-paginate-v2", "~> 3.0"
    spec.add_runtime_dependency "jemoji", "~> 0.12"
  end
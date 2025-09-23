---
title: "k6 Official extensions"
---

{{ $data := dict }}
{{ $url := "https://registry.k6.io/catalog.json" }}
{{ $resource := resources.GetRemote $url }}
{{ if $resource }}
  {{ if $resource.Err }}
    {{ errorf "Failed to get remote resource %q: %s" $url $resource.Err }}
  {{ else }}
    {{ $data = $resource | transform.Unmarshal }}
  {{ end }}
{{ else }}
  {{ errorf "Unable to get remote resource %q" $url }}
{{ end }}

| Extension | Description | Versions |
| --------- | ----------- | -------- |
{{- range $key, $extension := $data }}
{{- if eq $extension.tier "official" }}
| [{{ $extension.repo.name }}]({{ $extension.repo.url }}) | {{ $extension.description }} | {{ delimit $extension.versions ", " }} |
{{- end }}
{{- end }}

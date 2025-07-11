package test

import (
	"context"
	"os"
	"regexp"
	"testing"

	"github.com/d5/tengo/v2"
	"github.com/d5/tengo/v2/stdlib"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

//nolint:funlen
func TestRelref(t *testing.T) {
	t.Parallel()

	var setup = func() *tengo.Script {
		data, err := os.ReadFile("Relref.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		return script
	}

	t.Run("don't use", func(t *testing.T) {
		t.Parallel()

		src := `
- [TEXT]({{< relref "DESTINATION" >}})
- [TEXT]({{% relref "DESTINATION" %}})
- [TEXT]({{<relref "DESTINATION">}})
- [TEXT]({{%relref "DESTINATION"%}})
`
		script := setup()

		err := script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 9, "end": 20},
			{"begin": 48, "end": 59},
			{"begin": 87, "end": 97},
			{"begin": 124, "end": 134},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	// Note that this rule is so important, there are no exclusions allowed.
	t.Run("with exclusions", func(t *testing.T) {
		t.Parallel()

		src := `
Test exclusions:

<!-- vale Grafana.Relref = NO -->

- [TEXT]({{< relref "DESTINATION" >}})
- [TEXT]({{% relref "DESTINATION" %}})
- [TEXT]({{<relref "DESTINATION">}})
- [TEXT]({{%relref "DESTINATION"%}})

<!-- vale Grafana.Relref = YES -->

Don't use:

- [TEXT]({{< relref "DESTINATION" >}})
- [TEXT]({{% relref "DESTINATION" %}})
- [TEXT]({{<relref "DESTINATION">}})
- [TEXT]({{%relref "DESTINATION"%}})
`
		script := setup()

		err := script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 62, "end": 73},
			{"begin": 101, "end": 112},
			{"begin": 140, "end": 150},
			{"begin": 177, "end": 187},

			{"begin": 263, "end": 274},
			{"begin": 302, "end": 313},
			{"begin": 341, "end": 351},
			{"begin": 378, "end": 388},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})
}

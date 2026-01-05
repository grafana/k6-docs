---
title: 'Subcommand extensions'
description: 'Follow these steps to build a subcommand extension for k6.'
weight: 550
---

# Subcommand extensions

k6 provides a rich set of built-in commands, but some use cases require custom CLI tools that integrate with k6's runtime and state. Subcommand extensions allow you to register custom commands under the `k6 x` namespace, providing a standardized way to extend k6's CLI functionality.

Subcommand extensions are useful for:

- Setup and configuration tools (for example, verifying system requirements)
- Custom validation and testing utilities
- Integration tools that interact with k6's runtime state
- Helper commands specific to your testing infrastructure

Like other k6 extensions, subcommand extensions are built as Go modules that implement specific APIs and are compiled into custom k6 binaries using [xk6](https://github.com/grafana/xk6).

## Before you begin

To run this tutorial, you'll need the following applications installed:

- [Go](https://go.dev/doc/install)
- [Git](https://git-scm.com/install/)

You also need to install xk6:

```bash
go install go.k6.io/xk6/cmd/xk6@latest
```

## Write a simple extension

1. Set up a directory to work in.

   ```bash
   mkdir xk6-subcommand-mytool; cd xk6-subcommand-mytool; go mod init xk6-subcommand-mytool
   ```

1. The core of a subcommand extension is a constructor function that creates a Cobra command. The constructor receives k6's `GlobalState` for read-only access to runtime configuration.

   Create an example command named `mytool`:

   ```go
   package mytool

   import (
       "github.com/spf13/cobra"
       "go.k6.io/k6/cmd/state"
       "go.k6.io/k6/subcommand"
   )

   func init() {
       subcommand.RegisterExtension("mytool", newCommand)
   }

   func newCommand(gs *state.GlobalState) *cobra.Command {
       return &cobra.Command{
           Use:   "mytool",
           Short: "My custom tool",
           Long:  "A custom tool that integrates with k6",
           Run: func(cmd *cobra.Command, args []string) {
               gs.Logger.Info("Running mytool")
               // Custom logic here
           },
       }
   }
   ```

1. The extension uses the `subcommand.RegisterExtension` function to register itself during initialization. The first argument is the command name (which must match the command's `Use` field), and the second is the constructor function.

{{< admonition type="caution" >}}

The `GlobalState` provided to your command is read-only. Do not modify it, as this can cause core k6 instability.

{{< /admonition >}}

## Build k6 with the extension

Once you've written your extension, build a custom k6 binary with it by using `xk6`:

```bash
xk6 build --with xk6-subcommand-mytool=.
```

This creates a `k6` binary in your current directory that includes your extension.

## Use the extension

After building, your subcommand is available under the `k6 x` namespace:

```bash
./k6 x mytool
```

To see all available extension subcommands:

```bash
./k6 x help
```

## Constructor requirements

The constructor function passed to `RegisterExtension` must:

1. Accept a single `*state.GlobalState` parameter
2. Return a `*cobra.Command`
3. Create a command whose `Use` field matches the registered extension name

Violating these requirements causes the extension to panic at startup, ensuring configuration errors are caught early.

## Example: Complete validation tool

Here's a more complete example that checks system requirements:

```go
package validate

import (
    "fmt"
    "os"
    "runtime"

    "github.com/spf13/cobra"
    "go.k6.io/k6/cmd/state"
    "go.k6.io/k6/subcommand"
)

func init() {
    subcommand.RegisterExtension("validate", newValidateCommand)
}

func newValidateCommand(gs *state.GlobalState) *cobra.Command {
    cmd := &cobra.Command{
        Use:   "validate",
        Short: "Verify system requirements",
        Long:  "Check if the system meets requirements for running tests",
        RunE: func(cmd *cobra.Command, args []string) error {
            gs.Logger.Info("Checking system requirements...")
            
            // Check Go version
            gs.Logger.Infof("Go version: %s", runtime.Version())
            
            // Check available memory
            var m runtime.MemStats
            runtime.ReadMemStats(&m)
            gs.Logger.Infof("Available memory: %d MB", m.Sys/1024/1024)
            
            // Check environment variables
            if broker := os.Getenv("MQTT_BROKER"); broker != "" {
                gs.Logger.Infof("MQTT broker configured: %s", broker)
            } else {
                gs.Logger.Warn("MQTT_BROKER not set")
            }
            
            gs.Logger.Info("Validation complete")
            return nil
        },
    }
    
    return cmd
}
```

Usage:

```bash
./k6 x validate
```

## Access k6 runtime state

The `GlobalState` provides read-only access to k6's configuration:

```go
func newCommand(gs *state.GlobalState) *cobra.Command {
    return &cobra.Command{
        Use:   "validate",
        Short: "Validate k6 configuration",
        Run: func(cmd *cobra.Command, args []string) {
            // Access logger
            gs.Logger.Info("Validating k6 configuration...")
            
            // Access flags and options
            if gs.Flags.Verbose {
                gs.Logger.Debug("Verbose mode enabled")
            }
            
            // Access environment variables
            gs.Logger.Infof("Working directory: %s", gs.Getwd)
        },
    }
}
```

## Add command flags

Use Cobra's flag system to add options to your subcommand:

```go
func newCommand(gs *state.GlobalState) *cobra.Command {
    var target string
    var verbose bool
    
    cmd := &cobra.Command{
        Use:   "validate",
        Short: "Validate configuration",
        Run: func(cmd *cobra.Command, args []string) {
            if verbose {
                gs.Logger.Info("Verbose mode enabled")
            }
            gs.Logger.Infof("Validating target: %s", target)
            // Validation logic here
        },
    }
    
    cmd.Flags().StringVarP(&target, "target", "t", "localhost", "Target to validate")
    cmd.Flags().BoolVarP(&verbose, "verbose", "v", false, "Enable verbose output")
    
    return cmd
}
```

Usage:

```bash
./k6 x validate --target example.com --verbose
```

## Best practices

- **Read-only state**: Never modify the `GlobalState` passed to your constructor
- **Naming**: Use descriptive, kebab-case names for your commands
- **Documentation**: Provide clear `Short` and `Long` descriptions
- **Error handling**: Return errors from `RunE` rather than panicking in command execution
- **Logging**: Use `gs.Logger` for consistent output with k6's logging system


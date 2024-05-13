---
aliases:
  - ../misc/fine-tuning-os # docs/k6/<K6_VERSION>/misc/fine-tuning-os
  - ./fine-tuning-os
title: 'Fine-tune OS'
description: 'Learn how to inspect the OS imposed limits of your system, and tweak them to be able to run larger tests.'
weight: 200
---

# Fine-tune OS

{{< admonition type="note" >}}

This page focuses on helping users run large test scripts locally. If you're just getting started with k6, and haven't run into a `Too Many Open Files` error, you can skip these instructions.

{{< /admonition >}}

When running large test scripts locally, users sometimes run into limits within their OS that prevent them from making the necessary number of requests to complete the test.
This limit usually manifests itself in a `Too Many Open Files` error.
These limits, if unchanged, can be a severe bottleneck if you choose to run a bigger or complicated test locally on your machine.

This article shows you how to inspect the OS-imposed limits of your system, tweak them, and scale for larger tests.

Important to note here is that everything that we cover in this article needs to be approached with a healthy dose of caution.
As with any changes to your OS, we discourage blindly changing your system settings to a specific value. You should document ways of testing that shows a clear before-and-after relation.
E.g. before changing MSL / TIME_WAIT period, confirm that you’re experiencing the issue (error messages, netstat, ss, etc.), change settings conservatively, re-run the test, and note any improvement.
This way you can gauge the effect of the optimization, find any negative side-effects, and come up with a range of recommended values.

## Before you begin

- The following modifications have been tested for Linux, and macOS Sierra 10.12 and above. If you're using an older macOS version, the process for changing these settings might differ.

## Network resource limit

Unix operating system derivatives such as GNU/Linux, BSDs and macOS, can limit the amount of system resources available to a process to safeguard system stability. This includes the total amount of memory, CPU time, or amount of open files a single process is allowed to manage.

Since in Unix everything is a file, including network connections, application testing tools that heavily use the network, such as k6, might reach the configured limit of allowed open files, depending on the amount of network connections used in a particular test.

As mentioned in our opening section, this results in a message like the following being shown during a test:

```bash
WARN[0127] Request Failed     error="Get http://example.com/: dial tcp example.com: socket: too many open files"
```

This message means that the network resource limit has been reached, which will prevent k6 from creating new connections, thus altering the test result. In some cases this may be desired, to measure overall system performance, for example, but in most cases this will be a bottleneck towards testing the HTTP server and web application itself.

The next sections describe ways to increase this resource limit, and allow k6 to run tests with hundreds or thousands of concurrent VUs from a single system.

### Viewing limits configuration

Unix systems have two types of resource limits:

- **Hard limits.** The absolute maximum allowed for each user, and can be configured only by the root user.
- **Soft limits.** These can be configured by each user, but cannot be above the hard limit setting.

### Linux

On GNU/Linux, you can see the configured limits with the ulimit command.

`ulimit -Sa` will show all soft limits for the current user:

```bash
$ ulimit -Sa
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3736
max locked memory       (kbytes, -l) 16384
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3736
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

While `ulimit -Ha` will show all hard limits for the current user:

```bash
$ ulimit -Ha
core file size          (blocks, -c) unlimited
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3736
max locked memory       (kbytes, -l) 16384
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1048576
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) unlimited
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3736
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

Note the difference of open files being a maximum of 1024 for the soft limit, while it's 1048576 for the hard limit.

### macOS

In macOS however, you will have a couple of different system imposed limits to take into consideration.

The first one is `launchctl limit maxfiles` which prints the per-process limits which are specified also as a soft limit and a hard limit. When a soft limit is exceeded a process may receive a signal (for example, if the CPU time or file size is exceeded), but it will be allowed to continue execution until it reaches the hard limit (or modifies its resource limit).
`kern.maxfiles` is the limit of total file descriptors on the entire system - the sum total of all the open files for all processes plus all the files the kernel has open for its own purposes.

`sysctl kern.maxfiles`

`sysctl kern.maxfilesperproc`

So, to reiterate, running commands above will show you the system limits on open files and running processes.

## Changing limits configuration

The first thing you should consider before changing the configuration is the amount of network connections you expect your test to require. The http_reqs metric in the k6 result summary can hint at this, but a baseline calculation of number of max. VUs \* number of HTTP requests in a single VU iteration will deliver a fair approximation. Note that k6 also deals with text files and other resources that count towards the "open files" quota, but network connections are the biggest consumers.

### Disabling limits in macOS

Before we can change any system imposed limits in macOS we will need to disable a security feature put in place to prevent us in doing so. You will need to disable System Integrity Protection that was introduced in OS X El Capitan to prevent certain system-owned files and directories from being modified by processes without the proper privileges.

To disable it you will need to restart your Mac and hold down `Command + R` while it boots. This will boot it into Recovery Mode.

There you should navigate to `Utilities` which are located in the menu bar at the top of the screen, then open `Terminal`. Once you have it open, enter the following command:

`csrutil disable`

Once you press enter and close the Terminal, you can reboot your Mac normally and log into your account.

### Changing soft limits

#### Linux

So, let's say that we want to run a 1000 VU test which makes 4 HTTP requests per iteration. In this case we could increase the open files limit to 5000, to account for additional non-network file usage. This can be done with the following command:

```bash
$ ulimit -n 5000
```

This changes the limit only for the current shell session.

If we want to persist this change for future sessions, we can add this to a shell startup file. For Bash this would be:

```bash
$ echo "ulimit -n 5000" >> ~/.bashrc
```

#### macOS

If the soft limit is too low, set the current session to (values written here are usually close to default ones) :

```bash
sudo launchctl limit maxfiles 65536 200000
```

Since sudo is needed, you are prompted for a password.

### Changing hard limits

#### Linux

If the above command results in an error like cannot modify limit: Operation not permitted or value exceeds hard limit, that means that the hard limit is too low, which as mentioned before, can only be changed by the root user.

This can be done by modifying the `/etc/security/limits.conf` file.

For example, to set both soft and hard limits of the amount of open files per process for the alice account, open `/etc/security/limits.conf` as root in your text editor of choice and add the following lines:

```bash
alice soft nofile 5000
alice hard nofile 1048576
```

The new limits will be in place after logging out and back in.

Alternatively, \* hard nofile 1048576 would apply the setting for all non-root user accounts, and root hard nofile 1048576 for the root user. See the documentation in that file or man bash for the ulimit command documentation.

#### macOS

Next step will be to configure your new file limits. Open terminal and paste the following command:

```bash
sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
```

This will open a text editor inside your terminal window where you will be prompted to provide your user password and then paste the following:

```markup
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
 "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
 <dict>
 <key>Label</key>
 <string>limit.maxfiles</string>
 <key>ProgramArguments</key>
 <array>
 <string>launchctl</string>
 <string>limit</string>
 <string>maxfiles</string>
 <string>64000</string>
 <string>524288</string>
 </array>
 <key>RunAtLoad</key>
 <true/>
 <key>ServiceIPC</key>
 <false/>
 </dict>
</plist>
```

Pressing `Control + X` will save the changes and exit the editor. By pasting and saving this we have introduced two different limitations to your maxfiles limit. The first one (64000) is a soft limit, which if reached, will prompt your Mac to prepare to stop allowing new file opens but still let them open. If the second one is reached (524288), a hard limit, you will again start seeing your old friend, the 'too many open files' error message.

We will use the same procedure to increase the processes limit next.

While in Terminal create a similar file with this command:

```bash
sudo nano /Library/LaunchDaemons/limit.maxproc.plist
```

Again, after prompted for your password, you can paste the following and save and close with `Control + X`

```markup
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
 <plist version="1.0">
 <dict>
 <key>Label</key>
 <string>limit.maxproc</string>
 <key>ProgramArguments</key>
 <array>
 <string>launchctl</string>
 <string>limit</string>
 <string>maxproc</string>
 <string>2048</string>
 <string>4096</string>
 </array>
 <key>RunAtLoad</key>
 <true />
 <key>ServiceIPC</key>
 <false />
 </dict>
 </plist>
```

All that is left after this is to reboot your Mac back to the Recovery Mode, open the Terminal, turn the SIP back on with `csrutil enable` and check if the limits were changed with commands we used at the beginning.

In most cases these limits should be enough to run most of your simple tests locally for some time, but you can modify the files above to any values you will need in your testing.

{{% admonition type="warning" %}}

Please be aware that all of these limitations are put in place to protect your operating system from files and applications that are poorly written and might leak memory like in huge quantities. We would suggest not going too overboard with the values, or you might find your system slowing down to a crawl if or when it runs out of RAM.

{{% /admonition %}}

## Local port range

When creating an outgoing network connection the kernel allocates a local (source) port for the connection from a range of available ports.

### GNU/Linux

On GNU/Linux you can see this range with:

```bash
$ sysctl net.ipv4.ip_local_port_range net.ipv4.ip_local_port_range = 32768 60999
```

While 28,231 ports might be sufficient for most use cases, this might be a limiting factor if you’re testing with thousands of connections. You can increase it with, for example:

```bash
sysctl -w net.ipv4.ip_local_port_range="16384 65000"
```

Be aware that this range applies to both TCP and UDP, so be conservative with the values you choose and increase as needed.

To make the changes permanent, add `net.ipv4.ip_local_port_range=16384 65000` to `/etc/sysctl.conf`.
Last resort tweaks
If you still experience network issues with the above changes, consider enabling net.ipv4.tcp_tw_reuse:

```bash
sysctl -w net.ipv4.tcp_tw_reuse=1
```

This will enable a feature to quickly reuse connections in TIME_WAIT state, potentially yielding higher throughput.

### macOS/Linux

On macOS the default ephemeral port range is 49152 to 65535, for a total of 16384 ports. You can check this with the sysctl command:

```bash
$ sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last

net.inet.ip.portrange.first: 49152
net.inet.ip.portrange.last: 65535
```

Once you run out of ephemeral ports, you will normally need to wait until the TIME_WAIT state expires (2 \* maximum segment lifetime) until you can reuse a particular port number. You can double the number of ports by changing the range to start at 32768, which is the default on Linux and Solaris. (The maximum port number is 65535 so you cannot increase the high end.)

```bash
$ sudo sysctl -w net.inet.ip.portrange.first=32768

net.inet.ip.portrange.first: 49152 -> 32768
```

Note that the official range designated by IANA is 49152 to 65535, and some firewalls may assume that dynamically assigned ports fall within that range. You may need to reconfigure your firewall to use a larger range outside of your local network.

## General optimizations

This section goes over some optimizations that are not necessarily dependant on your OS, but may affect your testing.

### RAM usage

Depending on the particular k6 test: maximum number of VUs used, number and size of JavaScript dependencies, and complexity of the test script itself, k6 can consume large amounts of system RAM during test execution. While the development is focused on reducing RAM usage as much as possible, a single test run might use tens of gigabytes of RAM under certain scenarios.

As a baseline, count each VU instance to require between 1MB and 5MB of RAM, depending on your script complexity and dependencies. This is roughly between `GB and 5GB of required system RAM for a 1,000 VU test, so make sure that sufficient physical RAM is available to meet your test demands.

If you need to decrease the RAM usage, you could use the option `--compatibility-mode=base`. Read more on [JavaScript Compatibility Mode](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-compatibility-mode).

### Virtual memory

In addition to physical RAM, ensure that the system is configured with an appropriate amount of virtual memory, or swap space, in case higher memory usage bursts are required.

You can see the status and amount of available swap space on your system with the commands swapon or free.

We won't go into swap configuration details here, but you can find several guides online.

### Network performance

Because k6 can generate and sustain large amounts of network traffic, it also stresses the network stack of modern operating systems. Under certain loads or network conditions it's possible to achieve higher throughput and better performance by tweaking some network settings of the operating system or restructuring the network conditions of the test.

### TCP TIME_WAIT period

TCP network applications, such as web clients and servers, are assigned a network socket pair (a unique combination of local address, local port, remote address, and remote port) for each incoming or outgoing connection. Typically this socket pair is used for a single HTTP request/response session, and closed soon after. However, even after a connection is successfully closed by the application, the kernel might still reserve resources for quickly reopening the same socket if a new matching TCP segment arrives. This also occurs during network congestion where some packets get lost in transmission. This places the socket in a TIME_WAIT state, and is released once the TIME_WAIT period expires. This period is typically configured between 15 seconds and 2 minutes.

The problem some applications like k6 might run into is causing a high number of connections to end up in the TIME_WAIT state, which can prevent new network connections being created.

In these scenarios, before making changes to the system network configuration, which might have adverse side-effects for other applications, it's preferable to first take some common testing precautions.
Use different server ports or IPs

Since sockets are uniquely created for a combination of local address, local port, remote address and remote port, a safe workaround for avoiding TIME_WAIT congestion is using different server ports or IP addresses.

For example, you can configure your application to run on ports :8080, :8081, :8082, etc. and spread out your HTTP requests across these endpoints.

## Read more

- [Running large tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/running-large-tests)
- [JavaScript Compatibility Mode](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-compatibility-mode)

---
title: Let's talk about resiliency
date: 2020-04-10
draft: false
hero: "/images/computer-display.jpg"
caption:
  text: 
  attribution: Markus Spiske from Pexels
  attributionLink: https://www.pexels.com/@markusspiske?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels
excerpt: A short guide on what makes software resilient in the world of microservices.
bar:
  message: Wish to read this article on Medium?
  link: https://medium.com/@sarvesh0803/lets-talk-about-resiliency-37660be5eaf3
  linktext: Click here
tags: 
  - Resiliency
  - Software
  - API
  - Hystrix
  - Fault Tolerance
years: 2020
---
In my team, we have this concept of Tech Fridays, which are a series of monthly meet-ups where we discuss and disseminate knowledge residing in our team via tech talks.

But that was before someone in Wuhan touched the wrong animal and we were all mandated to lock ourselves in our homes. With more than usual free time on my plate and a challenge from an annoying friend, I decided to pen down my presentation and hopefully share something new with whoever chooses to read this article (thank you).

## What is this article about?

This article is about the innate quality that pushed Thomas Edison to continue his search for a filament for the light bulb even after more than 1000 failed attempts, or the ability that drove Barcelona to defeat PSG 6–1 and clinch victory despite being thrashed 4–0 in the first leg.

Only I am not going to talk about great scientists or football teams, but software. Particularly how you can build resilient software with the help of Hystrix, a latency and fault tolerance library created by Netflix, designed to enable resilience in complex distributed systems that can never be 100% failure-free. I will also explain the concepts of circuit breakers and fallbacks which form the crux of Hystrix with as little code as possible.

## Prerequisites

You would need to know some basic concepts of operating systems and computer software to understand this article properly.

**Threads:** Computer programs are essentially a sequence of instructions that are given to a computer to perform a specific task. But sometimes we want our computers to perform two sequences of instructions at once. The smallest sequence of programmed instructions that can be managed independently by the operating system is called a thread.

**Semaphores:** A semaphore is essentially a counter which controls access to a shared resource. What a semaphore counts is the number of permits available to the resource. If the counter is greater than zero, then access is allowed. If it is zero, then access is denied. Thus if a thread wants to access a resource, it must first acquire a permit from the semaphore.

**Synchronous requests:** A synchronous HTTP request is one where the caller thread is blocked until the call to the external service completes. In a synchronous request, the HTTP connection is open until the response is received. Asynchronous requests: Contrary to a synchronous request, an asynchronous request calls the server and continues with the next instruction. In this type of request, the main thread hands the waiting-for-response function to a worker thread and continues with the execution of the next line of code.

**Latency:** Latency is equivalent to delay. In the context of HTTP requests and microservices, latency is the time it takes to get a response back from any external service.

All set? Let’s talk about resiliency.

## What is Resiliency and why is it important?

Resiliency, as the name suggests, is the ability of the service to return to its original form. It also means the ability to elastically cope with failures, thereby not impacting the end-user drastically.

Although depending upon the context, the actual meaning varies, but, in general, a **Resilient System** is expected to have the following features:

* Fails fast and recovers
* Retries in case of a failure
* Has fallbacks in case of a failure
* Has near real-time monitoring of calls to external services

## What is Hystrix?

[Hystrix](https://github.com/Netflix/Hystrix) is a Java library built by Netflix for adding resiliency to distributed systems. It offers an implementation for circuit breaker, fallbacks, retries, timeout and more.

Although in maintenance mode now, the concepts and ideas from Hystrix still hold great value and are being actively utilized in alternate libraries, like the open source [resilience4j](https://github.com/resilience4j/resilience4j).

## What is a circuit breaker?

When one service synchronously invokes another there is always the possibility that the other service is unavailable or is exhibiting such high latency it is essentially unusable. In such scenarios, previous resources such as threads might be consumed in the caller while waiting for the other service to respond. This might lead to resource exhaustion, which would make the calling service unable to handle other requests. The failure of one service can potentially cascade to other services throughout the application causing a system failure.

### How to prevent a network or service failure from cascading to other services?

This is where the idea of a Circuit Breaker comes into play.

The idea is to fail fast to release pressure from the underlying system when we know it is likely to fail instead of making every user request wait for the timeout to occur.

The basic concept of a circuit breaker is simple, we wrap the part of our code which makes external calls in a circuit breaker object, which monitors for failures. The caller services are expected to invoke the external remote service via this proxy object. When the number of consecutive failures to the remote service crosses a threshold, the circuit breaker will open the circuit and all further calls to the circuit will prematurely fail without the underlying external call being made. This prevents precious resources from being exhausted and allows the external remote service to reach a healthy state.

{{< figure src="/images/circuit-breaker.jpg" caption="Flow diagram of a circuit breaker" attr="Martin Fowler" attrlink="https://martinfowler.com/bliki/CircuitBreaker.html" class="img-xs" >}}

In many ways, this circuit breaker is similar to the electrical circuit breakers we find in every household. Where it differs though is in its ability to reset itself automatically without the need for manual external intervention.

We can achieve this self-resetting behavior by introducing a reset timeout interval. After the timeout expires the circuit breaker goes into a half-open state where it allows a limited number of test external calls to pass through. If those requests succeed the circuit breaker resets and resumes normal operation. Otherwise, if there is a failure the timeout period begins again.

## What is a fallback?

Let’s say we’ve called a remote service and due to some issue, an error is thrown. Showing this error to the user might not be fruitful and will be detrimental to the user experience. For such cases, a fallback response is used. They can be used to suppress exceptions or failed executions and provide a default result which the user sees instead of the error.

**Fun fact:** In case of a failure in the service that gets recommendations, Netflix uses such a fallback mechanism to provide the default list of recommendations (movies/shows to watch) instead of a list catered to your interests and history.

***

That’s it for the theory, now let’s write some code. Some familiarity with Java will help for the following section.

## Hystrix Constructs

### HystrixCommand

Used to wrap code that will execute potentially risky functionality (typically meaning HTTP calls to external services) with fault and latency tolerance, circuit breaker and more.

It provides methods for executing the underlying routines synchronously, asynchronously or in a non-blocking fashion.

Here we configure `HystrixCommand` to call a Failure Generator service.

```java 
public class FailureGeneratorCommand extends HystrixCommand<String> {
    // Configuring a Jersey Client to connect to the Failure Generator Service
    private final String URI = "https://failuregenerator.com/";
    Client client = ClientBuilder.newClient();
    WebTarget webTarget = client.target(URI);

    public FailureGeneratorCommand() {
        super(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"));
    }

    @Override
    protected String run() {
        // Underlying external network call
        return webTarget.request()
                        .accept(MediaType.APPLICATION_JSON)
                        .get(String.class);
    }
}
```

We can call the Failure Generator service synchronously…

```java
String response = new FailureGeneratorCommand().execute();
```

…or asynchronously

```java
Future<String> futureResponse = new FailureGeneratorCommand().queue();
String response = futureResponse.get();
```

### HystrixCommandProperties

`HystrixCommandProperties` allows for setting various configuration options to an instance of `HystrixCommand`.

```java
public FailureGeneratorCommand() {
        super(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
                .andCommandPropertiesDefaults(HystrixCommandProperties
                                                .Setter()
                                                .withExecutionTimeoutInMilliseconds(500)));
}
```

Some of the commonly used properties are:

* Options for setting up `HystrixCommand` (`executionTimeoutInMilliseconds`, `executionTimeoutEnabled`)
* Options for setting the fallback configuration (`fallbackEnabled`)
* Options to be used by Hystrix when executing the command (`circuitBreakerEnabled`)

## Demonstrating the usage of a circuit breaker

The Failure Generator endpoint is configured such that it would return a success message for the first 5 requests. For the next 5 requests, this endpoint would throw an exception. Then the next 5 requests would return a success message.

Let’s now configure our `HystrixCommand` to use a circuit breaker.

```java
public class FailureGeneratorCommand extends HystrixCommand<String> {
    // Configuring a Jersey Client to connect to the Failure Generator Service
    private final String URI = "https://failuregenerator.com/";
    Client client = ClientBuilder.newClient();
    WebTarget webTarget = client.target(URI);

    public FailureGeneratorCommand() {
        super(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
                .andCommandPropertiesDefaults(HystrixCommandProperties
                                                .Setter()
                                                .withExecutionTimeoutInMilliseconds(10000)                                  
                                                .withCircuitBreakerEnabled(true)
                                                .withCircuitBreakerRequestVolumeThreshold(1)
                                                .withCircuitBreakerErrorThresholdPercentage(25)
                                                .withCircuitBreakerSleepWindowInMilliseconds(5000));
    }

    @Override
    protected String run() {
        // Underlying external network call
        return webTarget.request()
                        .accept(MediaType.APPLICATION_JSON)
                        .get(String.class);
    }
}
```

As we have set the error threshold percentage (`circuitBreakerErrorThresholdPercentage`) to 25, the five requests which fail will cause the circuit breaker to open. At this point, even if we send 50 requests Hystrix will throw an exception. After the trailing window of 2 seconds (`circuitBreakerSleepWindowInMilliseconds`) has passed, Hystrix will allow one request to pass and if this request succeeds, then the response will be returned.

## Demonstrating the usage of fallbacks

This time we will configure our Failure Generator endpoint to always throw an exception.

Let’s now configure our `HystrixCommand` instance to respond with a fallback when the external call fails.

```java
public class FailureGeneratorCommand extends HystrixCommand<String> {
    // Configuring a Jersey Client to connect to the Failure Generator Service
    private final String URI = "https://failuregenerator.com/";
    Client client = ClientBuilder.newClient();
    WebTarget webTarget = client.target(URI);

    public FailureGeneratorCommand() {
        super(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
                .andCommandPropertiesDefaults(HystrixCommandProperties
                                                .Setter()
                                                .withExecutionTimeoutInMilliseconds(10000)
                                                .withFallbackEnabled(true));
    }

    @Override
    protected String run() {
        // Underlying external network call
        return webTarget.request()
                        .accept(MediaType.APPLICATION_JSON)
                        .get(String.class);
    }

    // this method is executed whenever run() throws an error
    @Override
    protected String getFallback() {
        return "This is the fallback message";
    }
}
```

This command’s `run()` method will fail on every execution. However, the caller will always receive the value returned by the command’s `getFallback()` method instead of receiving an exception. The response will always be `This is the fallback message`.

***

Alright. This concludes the article. Hopefully, you enjoyed reading this and learned something new. Please feel free to leave any sort of feedback in the comments below.

Until next time. Stay indoors. Stay safe.

## References

1. [https://github.com/Netflix/Hystrix/wiki/How-it-Works](https://github.com/Netflix/Hystrix/wiki/How-it-Works)
2. [https://github.com/Netflix/Hystrix/wiki/How-To-Use](https://github.com/Netflix/Hystrix/wiki/How-To-Use)
3. [https://github.com/Netflix/Hystrix/wiki/Configuration](https://github.com/Netflix/Hystrix/wiki/Configuration)
4. [https://martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html)
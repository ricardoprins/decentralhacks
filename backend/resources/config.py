import sentry_sdk


sentry_sdk.init(
    "https://3f597e944037475f9df53d5713e5bb16@o438472.ingest.sentry.io/5403230",
    traces_sample_rate = 1.0
)
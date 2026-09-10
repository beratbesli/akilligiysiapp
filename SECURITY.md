# Security Policy

## Scope

Akıllı Giysi Sağlık Monitörü is a static browser prototype. Measurements and
alerts are synthetic, and the application stores demo profile data only in the
browser's local storage; it has no backend, account system, or device link.
The supported security surface is the code on `main` and the latest tagged
release.

## Reporting a vulnerability

Please report security issues privately through GitHub's **Report a
vulnerability** flow on this repository. Do not put personal, health, or
browser-storage data in an issue. If private reporting is unavailable, open a
public issue with only a non-sensitive summary and request a private channel.

Include the affected commit or browser, reproduction steps, and the expected
versus observed behavior. Reports involving unintended data persistence,
unsafe DOM handling, or accessibility-related security regressions are in
scope.

## Response

Reports are reviewed against the current `main` branch and coordinated with
the reporter before disclosure. This prototype must not be used for medical
decisions or emergency response.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]
- nothing yet

## [4.0.0] - 2022-04-29
### Added
- todomvc-like demo app
- more docs

## [4.0.0-beta.1] - 2022-04-20
### Added
- basic docs with demo app
### Fixed
- Invalid state returned when dependency of a selector function changed without changing the store state
### Dev
- deps updated
- fixed TS complaining on module.scss files on demo
- don't publish .next folder

## [4.0.0-alpha.3] - 2021-12-24
### Added
- hooks support
- direct access to the underlying state store (`Truth` instance`) for all your non-React needs
### Changed
- General API changes, you need to use a factory function to get Provider and connect (and new hooks)
- `connect` no longer returns a method which takes a component but requires a component as a first argument and returns
new component instead
- instead of passing default state to Provider you need to create a `Truth` instance

## [3.0.0-alpha.3] - 2020-05-21
### Added
- TypeScript typings

## [2.1.1] - 2019-09-04
### Fixed
- bad component display name because of ref forwarding

## [2.1.0] - 2019-09-03
### Changed
- if updater function returns a value it is now accessible when this function is called

## [2.0.0] - 2019-08-28
### Fixed
- dev deps audit warnings
### Changed
- files extensions to JSX (this is only breaking change)
- dev stuff to make package smaller

## [1.2.0] - 2019-08-27
### Fixed
- React ref not being passed into wrapped component
- dev deps audit warnings
### Changed
- Missing name in LICENSE file

## [1.1.1] - 2019-07-09 - not released to npm
### Fixed
- (development issue) eslint not running correctly on every OS

## [1.1.0] - 2019-07-07
### Changed
- performance optimization - mapUpdateToProps results are cached until props are changed
### Added
- some docs

## [1.0.0] - 2019-07-06
### Added
- first version

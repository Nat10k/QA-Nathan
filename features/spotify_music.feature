@spotify
Feature: spotify music and podcast
  In order to listen to music and podcast
  As a user
  I want to be able to play music and podcast from spotify

  Background:
    Given I am logged in as a user

  Scenario: open the first of the recommended songs on top of page
    Given I am on the home page
    When I click the first song in my recommended list
    And I click play
    Then I should hear the music being played

  Scenario: open a shows to try
    Given I am on the home page
    When I click one of the shows in shows to try section
    And I click play
    Then I should hear the podcast being played
  
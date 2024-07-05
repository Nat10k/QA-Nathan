@spotify
Feature: spotify profile
  In order to identify myself
  As a user
  I want to be able to open and edit my profile

  Background:
    Given I am logged in as a user

  Scenario: open profile
    Given I am on the home page
    When I click the profile button
    Then I should see profile

  Scenario: change profile picture
    Given I am on my profile page
    When I click the more options button
    And I click edit profile
    And I upload my profile picture
    And I save
    Then I should see profile and my new profile picture
  
  Scenario: delete profile picture
    Given I am on my profile page
    When I click the more options button
    And I click edit profile
    And I click remove photo
    And I save
    Then I should see profile and my profile picture empty
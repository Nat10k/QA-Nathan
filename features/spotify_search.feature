@spotify
Feature: spotify search
  In order to listen to find music / podcasts / artists
  As a user
  I want to be able to search for music / podcasts / artists


  Scenario: search an artist
    Given I am on the home page
    When I click the search button
    And I search for "Dewa"
    Then I should see "Dewa 19" in the results

  Scenario: search a song
    Given I am on the home page
    When I click the search button
    And I search for "Show"
    Then I should see "Show" in the results
  
  Scenario: choose a category filter
    Given I am on the home page
    When I click the search button
    And I search for "Show"
    And I click "Albums" category
    Then I should see "SHOWFER" in the filtered results
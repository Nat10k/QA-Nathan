Feature: Facebook Marketplace
  In order to buy items from other users
  As a user
  I want to be able to use the marketplace

  Background:
    Given I am logged in as a user

  Scenario: open marketplace
    Given I am on the welcome page
    When I click Marketplace
    Then I should see items in the marketplace

  Scenario: see item details
    Given I am on the marketplace page
    When I click one of the items
    Then I should see details of the item
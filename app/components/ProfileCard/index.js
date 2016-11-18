/**
*
* ProfileCard
*
*/

import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import { WithContext as TagsInput } from 'react-tag-input';
import TagsList from 'components/TagsList';
import ProfileEntitiesList from 'components/ProfileEntitiesList';

import styles from './styles.css';

export class ProfileCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    editProfile: React.PropTypes.func,
    cancelEditProfile: React.PropTypes.func,
    saveProfile: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    profile: React.PropTypes.object,
    clickOnProfileTag: React.PropTypes.func,
    clickOnEntityTag: React.PropTypes.func,
    clickOnEntityDelete: React.PropTypes.func,
    clickOnEntity: React.PropTypes.func,
  }
  handleClickOnEdit = (profile) => {
    this.props.editProfile(profile.id);
  }
  handleClickOnCancelEdit = (profile) => {
    this.props.cancelEditProfile(profile.id);
  }
  handleClickOnSave = (profile) => {
    this.props.saveProfile(profile);
  }
  handleClickOnDelete = (profile) => {
    this.props.deleteProfile(profile.id);
  }
  handleTagAddition = (tag) => {
    this.props.profile.tags.push({ id: this.props.profile.tags.length + 1, text: tag });
  }
  handleTagDelete = (index) => {
    const tags = this.props.profile.tags;
    tags.splice(index, 1);
    this.props.profile.tags = tags;
  }
  renderProfileCardHeader = (profile) => {
    const { editing, name } = profile;
    return (
      <div className={styles.cardHeader}>
        <div
          className={styles.cardHeaderTitleWrapper}
        >
          <TextField
            defaultValue={name}
            floatingLabelText="Profile Name"
            disabled={!editing}
            style={{ width: '140px' }}
          />
        </div>
        <div
          className={styles.cardHeaderDeleteWrapper}
        >
          <RaisedButton
            label="DELETE"
            secondary
            icon={<ActionDelete />}
            onClick={(mouseEvent) => { this.handleClickOnDelete(profile, mouseEvent); }}
          />
        </div>
        { editing ? null :
          <div
            className={styles.cardHeaderEditWrapper}
          >
            <RaisedButton
              label="EDIT"
              primary
              icon={<ModeEdit />}
              onClick={(mouseEvent) => { this.handleClickOnEdit(profile, mouseEvent); }}
            />
          </div>
        }
        { editing ?
          <div
            className={styles.cardHeaderCancelWrapper}
          >
            <RaisedButton
              label="CANCEL"
              icon={<NavigationCancel />}
              onClick={(mouseEvent) => { this.handleClickOnCancelEdit(profile, mouseEvent); }}
            />
          </div>
        : null }
        { editing ?
          <div
            className={styles.cardHeaderSaveWrapper}
          >
            <RaisedButton
              label="SAVE"
              primary
              icon={<ContentSave />}
              onClick={(mouseEvent) => { this.handleClickOnSave(profile, mouseEvent); }}
            />
          </div>
        : null }
      </div>
    );
  }
  renderValidatedEntitiesList = (profile, editing) =>
    <div className={styles.validatedEntitiesWrapper}>
      { profile.validatedInformationElements.length > 0 ?
        <ProfileEntitiesList
          listTitle="Validated Documents"
          entities={profile.validatedInformationElements}
          editing={editing}
        />
      : null}
      { profile.validatedEvents.length > 0 ?
        <ProfileEntitiesList
          listTitle="Validated Events"
          entities={profile.validatedEvents}
          editing={editing}
        />
      : null}
    </div>
  renderSuggestedEntitiesList = (profile, editing) =>
    <div className={styles.suggestedEntitiesWrapper}>
      { profile.suggestedInformationElements.length > 0 ?
        <ProfileEntitiesList
          listTitle="Suggested Documents"
          entities={profile.suggestedInformationElements}
          editing={editing}
          clickOnEntityTag={this.props.clickOnEntityTag}
        />
      : null}
      { profile.suggestedEvents.length > 0 ?
        <ProfileEntitiesList
          listTitle="Suggested Events"
          entities={profile.suggestedEvents}
          editing={editing}
          clickOnEntityTag={this.props.clickOnEntityTag}
        />
      : null}
    </div>
  renderProfileCardBody = (profile) => {
    const { editing, tags } = profile;
    return (
      <div className={styles.profileCardBodyWrapper}>
        <CardText>
          <Row>
            <Col
              xs={2}
            >
              <h4>Tags</h4>
              { editing ?
                <TagsInput
                  tags={tags}
                  handleDelete={this.handleTagDelete}
                  handleAddition={this.handleTagAddition}
                  classNames={{
                    tagInput: `${styles.profileTagsInput}`,
                    selected: `${styles.profileTagsSelected}`,
                    tag: `${styles.profileTagsEditing}`,
                    remove: `${styles.profileTagsRemove}`,
                    suggestions: `${styles.profileTagSuggestion}`,
                  }}
                />
              :
                <TagsList
                  entityID={profile.id}
                  tags={profile.tags}
                  clickOnTag={this.props.clickOnProfileTag}
                  className={styles.profileTags}
                />
              }
            </Col>
            <Col
              xs={2}
            >
              {this.renderSuggestedEntitiesList(profile, editing)}
            </Col>
            <Col
              xs={4}
            >
              {this.renderValidatedEntitiesList(profile, editing)}
            </Col>
          </Row>
        </CardText>
      </div>
    );
  }
  render() {
    const { profile } = this.props;
    return (
      <Card>
        {this.renderProfileCardHeader(profile)}
        {this.renderProfileCardBody(profile)}
      </Card>
    );
  }
}

export default ProfileCard;

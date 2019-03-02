//  Created by songlcy on 2017/11/14.


#import <React/RCTBridgeModule.h>
#import "TWMessageBarManager.h"
#import <YWFeedbackFMWK/YWFeedbackKit.h>
#import <YWFeedbackFMWK/YWFeedbackViewController.h>

@interface feedbackModule : NSObject<RCTBridgeModule>

@property (nonatomic,strong) YWFeedbackKit *feedbackKit;

@end

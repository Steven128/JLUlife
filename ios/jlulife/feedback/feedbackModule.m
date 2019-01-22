//  Created by songlcy on 2017/11/14.

#import "AppDelegate.h"
#import "feedbackModule.h"

static NSString * const kAppKey = @"25524209";
static NSString * const kAppSecret = @"8d9fcb4016aef4c8746b9744ae32b369 ";

@implementation feedbackModule

RCT_EXPORT_MODULE(FeedbackModule)

RCT_EXPORT_METHOD(openFeedbackActivity:(NSDictionary *)POiData) {
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [self openFeedbackViewController:POiData];
  });
}

- (void)openFeedbackViewController:(NSDictionary*)POiData {

  if (POiData != nil) {
    self.feedbackKit.extInfo = POiData;
  }else {
    self.feedbackKit.extInfo = nil;
  }
  
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication]delegate];
  UIViewController * vc =  delegate.window.rootViewController;
  
  [self.feedbackKit makeFeedbackViewControllerWithCompletionBlock:^(YWFeedbackViewController *viewController, NSError *error) {
    if (viewController != nil) {
      UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:viewController];
      [vc presentViewController:nav animated:YES completion:nil];
      
      [viewController setCloseBlock:^(UIViewController *aParentController){
        [aParentController dismissViewControllerAnimated:YES completion:nil];
      }];
    } else {
      /** 使用自定义的方式抛出error时，此部分可以注释掉 */
      NSString *title = [error.userInfo objectForKey:@"msg"]?:@"接口调用失败，请保持网络通畅！";
      [[TWMessageBarManager sharedInstance] showMessageWithTitle:title
                                                     description:nil
                                                          type:TWMessageBarMessageTypeError];
    }
  }];
}

-(BCFeedbackKit *)feedbackKit{
  if (!_feedbackKit) {
    _feedbackKit = [[YWFeedbackKit alloc] initWithAppKey:kAppKey appSecret:kAppSecret];
    _feedbackKit.defaultCloseButtonTitleFont = [UIFont boldSystemFontOfSize:0];
    _feedbackKit.defaultRightBarButtonItemTitleFont = [UIFont boldSystemFontOfSize:0];
    
  }
  return _feedbackKit;
}



@end
